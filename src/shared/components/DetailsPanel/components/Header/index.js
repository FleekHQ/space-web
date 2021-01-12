import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons/faEllipsisV';

import useStyles from './styles';
import { MAX_NUMBER_OF_ICONS_PREVIEW, getIconStyles } from './utils';

const DetailsPanelHeader = ({ objects, viewMode }) => {
  const classes = useStyles({ viewMode });
  const { t } = useTranslation();
  const allFolders = objects.filter((obj) => obj.type === 'folder');

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
        <ButtonBase>
          <FontAwesomeIcon
            icon={faEllipsisV}
            className={classes.actionIcon}
          />
        </ButtonBase>
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
