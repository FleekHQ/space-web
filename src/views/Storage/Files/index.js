import React, { useEffect } from 'react';
import path from 'path';
import get from 'lodash/get';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';
import { objectsSelector } from '@utils';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FolderNavButton from '@ui/FolderNavButton';
import { fetchObjects, openObject } from '@events';
import FileTable from '@shared/components/FileTable';
import { useRouteMatch, useHistory } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';

import useStyles from './styles';

const StorageMainView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { params } = useRouteMatch();

  const prefix = get(params, '0');

  console.log('prefix', prefix);

  const rows = useSelector((state) => {
    const wd = localStorage.getItem('_wd') || '';

    return objectsSelector(
      state,
      '',
      path.join(wd, prefix),
      '/',
    );
  });

  useEffect(() => {
    fetchObjects();
  }, []);


  const onClickRow = (obj) => {
    if (obj.type === 'folder') {
      const redirectUrl = path.join('/storage/files', prefix, obj.name);
      history.push(redirectUrl);
    } else if (obj.type === 'file') {
      openObject(obj.key);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FolderNavButton
          direction="back"
          onClick={() => history.goBack()}
        />
        <FolderNavButton
          direction="forward"
          className={classes.forwardButton}
          onClick={() => history.goForward()}
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
      <Typography variant="h6" className={classes.title} weight="medium">
        {t('navigation.files')}
      </Typography>
      <div className={classes.tableWrapper}>
        <FileTable rows={rows} onClick={onClickRow} />
      </div>
    </div>
  );
};

export default StorageMainView;
