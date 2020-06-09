import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './styles';

const propsToAllowOnlyDirectory = {
  webkitdirectory: 'true',
  directory: 'true',
};

const Dropzone = ({
  children,
  allowOnlyDirectory,
  classes: overrideClasses,
  ...restProps
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone(restProps);
  const classes = useStyles();

  const inputProps = {
    ...getInputProps(),
    ...allowOnlyDirectory && propsToAllowOnlyDirectory,
  };

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      className={classnames(classes.root, overrideClasses.root, {
        [overrideClasses.active]: isDragActive,
      })}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...inputProps} />
      {children}
    </div>
  );
};

Dropzone.defaultProps = {
  allowOnlyDirectory: false,
  classes: {},
};

Dropzone.propTypes = {
  children: PropTypes.node.isRequired,
  allowOnlyDirectory: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string,
    active: PropTypes.string,
  }),
};

export default Dropzone;
