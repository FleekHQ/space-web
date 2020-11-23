import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';
import TableCell from '../TableCell';

const FileCell = (props) => {
  const {
    ext,
    src,
    children,
    collapsed,
    tabulations,
    ...tableCellProps
  } = props;

  const classes = useStyles({ tabulations });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableCell {...tableCellProps}>
      <div className={classes.container}>
        <div className={classes.tabulations} />
        <div className={classes.arrowContainer}>
          {ext === 'folder' && (
            <FontAwesomeIcon
              icon={collapsed ? faChevronRight : faChevronDown}
              className={classes.arrow}
            />
          )}
        </div>
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
  collapsed: true,
  tabulations: 0,
};

FileCell.propTypes = {
  ext: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  tabulations: PropTypes.number,
};

export default FileCell;
