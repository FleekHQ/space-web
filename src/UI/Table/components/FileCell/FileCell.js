import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './styles';
import TableCell from '../TableCell';

const FileCell = (props) => {
  const {
    ext,
    src,
    children,
    expanded,
    tabulations,
    arrowOnClick,
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
            <ButtonBase
              disableRipple
              className={classes.arrowButton}
              onClick={(e) => {
                e.stopPropagation();
                arrowOnClick();
              }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={expanded ? faChevronDown : faChevronRight}
                className={classes.arrow}
              />
            </ButtonBase>
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
  expanded: false,
  tabulations: 0,
  arrowOnClick: () => {},
};

FileCell.propTypes = {
  ext: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  tabulations: PropTypes.number,
  arrowOnClick: PropTypes.func,
};

export default FileCell;
