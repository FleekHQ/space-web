import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import ContextMenu from '@ui/ContextMenu';
import { getContextMenuItems } from '@utils';
import useMenuItemOnClick, {
  previewAction,
  copyLinkAction,
  shareAction,
} from '@utils/use-menu-item-on-click';

import { VIEW_MODES } from '../../constants';
import useStyles from './styles';
import { MAX_NUMBER_OF_ICONS_PREVIEW, getIconStyles } from './utils';

const DetailsPanelHeader = ({
  objects,
  viewMode,
  showTitle,
  onClose,
  mapContextMenuItems,
}) => {
  const classes = useStyles({ viewMode });
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  });

  const menuItems = getContextMenuItems({ object: objects[0], t });
  const contextMenuItems = mapContextMenuItems(menuItems);

  const handleContextMenuOpen = (event) => {
    event.preventDefault();

    setContextState({
      mouseX: event.clientX - 170,
      mouseY: event.clientY - 34,
    });
  };

  return (
    <div className={classes.root}>
      {showTitle && (
        <div
          className={classes.titleExitContainer}
        >
          <Typography
            className={classes.title}
          >
            {t('detailsPanel.title')}
          </Typography>
          <ButtonBase
            onClick={onClose}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className={classes.exitIcon}
            />
          </ButtonBase>
        </div>
      )}
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
      <Typography noWrap className={classes.fileName} variant="h6" weight="medium">
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
      {
        objects.length === 1 && (
          <div className={classes.actionButtons}>
            {
              objects[0].type === 'file'
              && objects[0].isAvailableInSpace
              && (
                <>
                  <ButtonBase>
                    <FontAwesomeIcon
                      onClick={() => {
                        previewAction({
                          clickedItem: objects[0],
                          dispatch,
                        });
                      }}
                      icon={faEye}
                      className={classes.actionIcon}
                    />
                  </ButtonBase>
                  <ButtonBase disabled>
                    <FontAwesomeIcon
                      icon={faLink}
                      className={classnames(
                        classes.actionIcon,
                        classes.disabledIcon,
                      )}
                      onClick={() => {
                        copyLinkAction({
                          clickedItem: objects[0],
                          dispatch,
                        });
                      }}
                    />
                  </ButtonBase>
                  <ButtonBase disabled>
                    <FontAwesomeIcon
                      onClick={() => {
                        shareAction({
                          clickedItem: objects[0],
                          dispatch,
                        });
                      }}
                      icon={faShare}
                      className={classnames(
                        classes.actionIcon,
                        classes.disabledIcon,
                      )}
                    />
                  </ButtonBase>
                </>
              )
            }
            <ButtonBase
              onClick={handleContextMenuOpen}
            >
              <FontAwesomeIcon
                icon={faEllipsisV}
                className={classes.actionIcon}
              />
            </ButtonBase>
            <Popper
              className={classes.contextMenuPopper}
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
                isDark={(viewMode === VIEW_MODES.PREVIEW) || (viewMode === VIEW_MODES.DARK)}
              />
            </Popper>
          </div>
        )
      }
    </div>
  );
};

DetailsPanelHeader.defaultProps = {
  showTitle: true,
  onClose: () => {},
  mapContextMenuItems: (items) => items,
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
      type: PropTypes.string,
      isAvailableInSpace: PropTypes.bool,
    }),
  ).isRequired,
  viewMode: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  onClose: PropTypes.func,
  mapContextMenuItems: PropTypes.func,
};

export default DetailsPanelHeader;
