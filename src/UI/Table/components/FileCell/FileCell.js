import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';

import useStyles from './styles';
import TableCell from '../TableCell';

const FileCell = (props) => {
  const {
    ext,
    src,
    children,
    ...tableCellProps
  } = props;

  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableCell {...tableCellProps}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>
          <FileIcon
            src={src}
            ext={ext}
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
