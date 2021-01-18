import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Popper from '@material-ui/core/Popper';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons/faEllipsisV';
import ContextMenu from '@ui/ContextMenu';
import { getContextMenuItems } from '@utils';
import useMenuItemOnClick from '@utils/use-menu-item-on-click';

import useStyles from './styles';
import { MAX_NUMBER_OF_ICONS_PREVIEW, getIconStyles } from './utils';

const DetailsPanelHeader = ({ objects, viewMode }) => {
  const classes = useStyles({ viewMode });
  const { t } = useTranslation();

  const initialContextState = {
    mouseX: null,
    mouseY: null,
  };

  const [contextState, setContextState] = useState(initialContextState);
  const allFolders = objects.filter((obj) => obj.type === 'folder');

  const handleContextClose = () => {
    setContextState(initialContextState);
  };

  const menuItemOnClick = useMenuItemOnClick({
    clickedItem: objects[0],
    handleContextClose,
    getRedirectUrl: () => {},
  });

  const contextMenuItems = getContextMenuItems(objects[0], t);

  const handleContextMenuOpen = (event) => {
    event.preventDefault();

    setContextState({
      mouseX: event.clientX - 170,
      mouseY: event.clientY - 34,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.fileIconWrapper}>
        {objects.slice(0, MAX_NUMBER_OF_ICONS_PREVIEW).map((obj, index) => (
          <div
            className={objects.length === 1 ? classes.centerIcon : classes.icon}
            key={obj.key}
            style={getIconStyles(index, objects.length)}
          >
            <FileIcon
              src={`file:${obj.key}`}
              ext={obj.ext}
            />
          </div>
        ))}
      </div>
      <Typography noWrap className={classes.title} variant="h6" weight="medium">
        {objects.length === 1
          ? objects[0].name
          : `${t(
            'detailsPanel.foldersNumber',
            { count: allFolders.length },
          )}, ${t(
            'detailsPanel.filesNumber',
            { count: objects.length - allFolders.length },
          )}`}
      </Typography>
      <div className={classes.actionButtons}>
        <ButtonBase>
          <FontAwesomeIcon
            icon={faEye}
            className={classes.actionIcon}
          />
        </ButtonBase>
        <ButtonBase>
          <FontAwesomeIcon
            icon={faLink}
            className={classes.actionIcon}
          />
        </ButtonBase>
        <ButtonBase>
          <FontAwesomeIcon
            icon={faShare}
            className={classes.actionIcon}
          />
        </ButtonBase>
        <ButtonBase
          onClick={handleContextMenuOpen}
        >
          <FontAwesomeIcon
            icon={faEllipsisV}
            className={classes.actionIcon}
          />
        </ButtonBase>
        <Popper
          open={contextState.mouseY !== null}
          onClose={handleContextClose}
          onClickAway={handleContextClose}
          style={{
            top: contextState.mouseY,
            left: contextState.mouseX,
          }}
        >
          <ContextMenu
            onClickAway={handleContextClose}
            menuItemOnClick={menuItemOnClick}
            items={contextMenuItems}
          />
        </Popper>
      </div>
    </div>
  );
};

DetailsPanelHeader.propTypes = {
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      ext: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      src: PropTypes.string,
      isUploading: PropTypes.bool,
      error: PropTypes.bool,
    }),
  ).isRequired,
  viewMode: PropTypes.string.isRequired,
};

export default DetailsPanelHeader;
