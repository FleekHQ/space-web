import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleIcon from './PeopleIcon';
import useStyles from './styles';
import TableCell from '../TableCell';

const FileNameCell = (props) => {
  const {
    ext,
    src,
    name,
    expanded,
    isShared,
    selected,
    tabulations,
    arrowOnClick,
    isUploading,
    ...tableCellProps
  } = props;

  const classes = useStyles({ tabulations });
  const textNode = useRef(null);
  const [isTooltip, setIsTooltip] = useState(false);
  const isFolder = ext === 'folder';

  useLayoutEffect(() => {
    if (textNode.current) {
      setIsTooltip(textNode.current.scrollWidth > textNode.current.clientWidth);
    }
  }, [isShared, name, tabulations]);

  const nameComponent = (
    <Typography
      variant="body1"
      noWrap
      ref={textNode}
      className={classnames({
        [classes.selected]: selected && !isUploading,
        [classes.uploading]: isUploading,
        [classes.nameHover]: !isUploading,
      })}
    >
      {name}
    </Typography>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
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
  isUploading: false,
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
  isUploading: PropTypes.bool,
};

export default FileNameCell;
