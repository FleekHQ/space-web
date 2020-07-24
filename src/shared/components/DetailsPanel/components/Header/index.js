import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
import FileIcon from '@ui/FileIcon';
import Typography from '@ui/Typography';
import useStyles from './styles';
import { MAX_NUMBER_OF_ICONS_PREVIEW, getIconStyles } from './utils';

const DetailsPanel = ({ objects }) => {
  const classes = useStyles();
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
      <Typography className={classes.title} variant="h6" weight="medium">
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
      <div className={classes.buttonsGroup}>
        {objects.length === 1 && (
          <Button variant="outlined" className={classes.openBtn}>
            {t('detailsPanel.open')}
            <FontAwesomeIcon className={classes.arrowIcon} icon={faChevronDown} />
          </Button>
        )}
        <Button variant="outlined" className={classes.menuBtn}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>
      </div>
    </div>
  );
};

DetailsPanel.propTypes = {
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      ext: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default DetailsPanel;
