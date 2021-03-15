/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RootRef from '@material-ui/core/RootRef';
import PeopleIcon from './PeopleIcon';
import useStyles from './styles';
import TableCell from '../TableCell';

const FileNameCell = (props) => {
  const {
    ext,
    src,
    name,
    rowIndex,
    expanded,
    isShared,
    selected,
    tabulations,
    arrowOnClick,
    onNameClick,
    isUploading,
    rowKey,
    ...tableCellProps
  } = props;

  const classes = useStyles({ tabulations });
  const textNode = useRef(null);
  const [isTooltip, setIsTooltip] = useState(false);
  const isFolder = ext === 'folder';

  const [, drag] = useDrag(() => ({
    item: {
      type: (isFolder ? 'folder' : 'file'),
      rowIndex,
      rowKey,
    },
  }), []);

  useLayoutEffect(() => {
    if (textNode.current) {
      setIsTooltip(textNode.current.scrollWidth > textNode.current.clientWidth);
    }
  }, [isShared, name, tabulations]);

  const nameComponent = (
    <Typography
      onClick={onNameClick}
      variant="body1"
      noWrap
      ref={textNode}
      className={classnames(classes.name, {
        [classes.selected]: selected && !isUploading,
        [classes.uploading]: isUploading,
        [classes.nameHover]: !isUploading,
      })}
    >
      {name}
    </Typography>
  );

  return (
    <RootRef rootRef={drag}>
      <TableCell {...tableCellProps}>
        <div className={classes.container}>
          <div className={classes.tabulations} />
          <div className={classes.arrowContainer}>
            {isFolder && (
              <ButtonBase
                disableRipple
                className={classnames(classes.arrowButton, {
                  [classes.uploading]: isUploading,
                })}
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
          <div
            className={classnames(classes.iconContainer, {
              [classes.uploading]: isUploading,
            })}
          >
            <FileIcon
              src={src}
              ext={ext}
            />
            {isFolder && isShared && <PeopleIcon color="#5A93BF" className={classes.sharedFolder} />}
          </div>
          {isTooltip ? (
            <Tooltip
              arrow
              interactive
              placement="top"
              classes={{
                popper: classes.popperRoot,
                tooltip: classes.tooltipRoot,
                arrow: classes.tooltipArrow,
              }}
              title={<Typography color="inherit" variant="body2">{name}</Typography>}
            >
              {nameComponent}
            </Tooltip>
          ) : nameComponent}

          {(isShared && !isFolder) && <PeopleIcon color="#7F8185" className={classes.icon} />}
        </div>
      </TableCell>
    </RootRef>
  );
};

FileNameCell.defaultProps = {
  name: '',
  src: null,
  ext: 'default',
  selected: PropTypes.bool,
  expanded: false,
  tabulations: 0,
  isShared: false,
  arrowOnClick: () => {},
  onNameClick: () => {},
  isUploading: false,
  rowKey: '',
};

FileNameCell.propTypes = {
  name: PropTypes.string,
  ext: PropTypes.string,
  selected: PropTypes.bool,
  src: PropTypes.string,
  expanded: PropTypes.bool,
  tabulations: PropTypes.number,
  isShared: PropTypes.bool,
  arrowOnClick: PropTypes.func,
  onNameClick: PropTypes.func,
  isUploading: PropTypes.bool,
  rowKey: PropTypes.string,
  rowIndex: PropTypes.number.isRequired,
};

export default FileNameCell;
