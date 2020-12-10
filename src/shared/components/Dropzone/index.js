import React, { useState, useRef, useEffect } from 'react';
import get from 'lodash/get';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import useStyles, { rowHeight, headHeight } from './styles';

const RAINBOW_BORDER_WIDTH = 2;

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
    const hoverRowIndex = Math.floor(yPosition / rowHeight);
    const hoverRowTopIndex = get(objectsList, `${hoverRowIndex}.index`, -1);
    if (hoverRowTopIndex !== rowNumber) {
      setRowNumber(hoverRowTopIndex);
    }
  };

  const handleOnDrop = (files) => {
    const target = rowNumber !== -1 && get(objectsList[rowNumber], 'isFolder', false)
      ? objectsList[rowNumber].name
      : undefined;
    onDrop(files, target);
  };

  const getFilesFromEvent = async (event) => {
    const files = [];
    const fileList = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList.item(i);
      files.push(file);
    }

    return files;
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    ...restProps,
    onDragOver,
    onDrop: handleOnDrop,
    getFilesFromEvent,
  });

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
    top: headHeight + rowNumber * rowHeight + 1,
    bottom: wrapperHeight.current - (headHeight + (rowNumber + 1) * rowHeight),
  } : {};

  const getSvg = (overrideSvgProps) => {
    const defaultHeight = Math.max(objectsList.length * rowHeight, wrapperHeight.current);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`calc(100% - ${RAINBOW_BORDER_WIDTH}px)`}
        height={`${defaultHeight + RAINBOW_BORDER_WIDTH / 2}px`}
        className={classes.rainbowField}
      >
        <linearGradient id="dropzone-gradient" x1="0%" y1="25%" x2="100%" y2="75%">
          <stop offset="18%" stopColor="#ed55eb" />
          <stop offset="42%" stopColor="#17e0d8" />
          <stop offset="59%" stopColor="#00ffc2" />
          <stop offset="81%" stopColor="#ffec06" />
        </linearGradient>
        <rect
          fill="transparent"
          y={rainbowFieldStyles.top ? rainbowFieldStyles.top : headHeight}
          x={`${RAINBOW_BORDER_WIDTH / 2}px`}
          width={`calc(100% - ${RAINBOW_BORDER_WIDTH}px)`}
          height={rainbowFieldStyles.top ? rowHeight : defaultHeight - headHeight}
          rx="6"
          ry="6"
          style={{ transition: 'y ease .17s, height ease .17s' }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...overrideSvgProps}
        />
      </svg>
    );
  };

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      className={classes.root}
    >
      <div ref={wrapperNode} className={classes.wrapper}>
        {isDragActive && (
          <>
            {getSvg({
              fill: 'url(#dropzone-gradient)',
            })}
            {getSvg({
              stroke: 'url(#dropzone-gradient)',
              strokeWidth: RAINBOW_BORDER_WIDTH,
            })}
          </>
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
