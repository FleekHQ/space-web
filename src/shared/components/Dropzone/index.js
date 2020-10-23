import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import useStyles, { rowHeight, headHeight } from './styles';

const Dropzone = ({
  children,
  objectsList,
  onDrop,
  ...restProps
}) => {
  const [rowNumber, setRowNumber] = useState(-1); // -1 means whole table is selected
  const wrapperNode = useRef(null);
  const wrapperHeight = useRef(0);

  const onDragOver = (event) => {
    const { clientY } = event;
    const { top } = wrapperNode.current.getBoundingClientRect();
    const yPosition = clientY - top - headHeight; // y position without top offset and scroll
    const hoverRowNumber = Math.floor(yPosition / rowHeight);
    if (hoverRowNumber !== rowNumber) {
      setRowNumber(hoverRowNumber);
    }
  };

  const handleOnDrop = (files) => {
    const target = rowNumber !== -1 && objectsList[rowNumber].isFolder
      ? objectsList[rowNumber].name
      : undefined;
    onDrop(files, target);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ ...restProps, onDragOver, onDrop: handleOnDrop });

  useEffect(() => {
    if (wrapperNode.current) {
      wrapperHeight.current = wrapperNode.current.getBoundingClientRect().height;
    }
  }, [wrapperNode.current, objectsList.length, window.innerHeight]);

  useEffect(() => {
    setRowNumber(-1);
  }, [isDragActive]);

  const classes = useStyles();

  const rainbowFieldStyles = get(objectsList, `${rowNumber}.isFolder`) ? {
    top: headHeight + rowNumber * rowHeight,
    bottom: wrapperHeight.current - (headHeight + (rowNumber + 1) * rowHeight),
  } : {};

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      className={classes.root}
    >
      <div ref={wrapperNode}>
        {isDragActive && (
          <div
            className={classes.rainbowField}
            style={rainbowFieldStyles}
          />
        )}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        {children}
      </div>
    </div>
  );
};

Dropzone.propTypes = {
  children: PropTypes.node.isRequired,
  onDrop: PropTypes.func.isRequired,
  objectsList: PropTypes.arrayOf(PropTypes.shape({
    isFolder: PropTypes.bool,
    name: PropTypes.string,
  })).isRequired,
};

export default Dropzone;
