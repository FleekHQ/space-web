import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';
import TableCell from '../TableCell';
import { EXT_ICON } from './constants';
import FileIcon from '../../../FileIcon';

const FileCell = (props) => {
  const {
    ext,
    src,
    children,
    ...tableCellProps
  } = props;

  const classes = useStyles();

  return (
    <TableCell {...tableCellProps}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <FileIcon
            src={src}
            type={EXT_ICON[ext] || EXT_ICON.default}
          />
        </div>
        {children}
      </div>
    </TableCell>
  );
};

FileCell.defaultProps = {
  src: null,
  ext: 'default',
  children: null,
};

FileCell.propTypes = {
  ext: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
};

export default FileCell;
