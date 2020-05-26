import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import Typography from '@ui/Typography';
import FolderNavButton from '@ui/FolderNavButton';
import TextField from '@ui/TextField';
import useStyles from './styles';
import FileTable from '../FileTable';

const StorageMainView = ({ rows }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FolderNavButton direction="back" disabled />
        <FolderNavButton
          direction="forward"
          className={classes.forwardButton}
          disabled
        />
        <TextField
          variant="filled"
          label={t('common.search')}
          className={classes.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Typography variant="h6" className={classes.title}>Files</Typography>
      <div className={classes.tableWrapper}>
        <FileTable rows={rows} />
      </div>
    </div>
  );
};

StorageMainView.propTypes = {
  rows: PropTypes.array,
}

export default StorageMainView;
