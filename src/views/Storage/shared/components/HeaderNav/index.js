import React from 'react';
import get from 'lodash/get';
import TextField from '@ui/TextField';
import { useTranslation } from 'react-i18next';
import FolderNavButton from '@ui/FolderNavButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { SEARCH_TERM_CHANGE } from '@reducers/storage';

import useStyles from './styles';

const HeaderNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { searchTerm } = useSelector((state) => ({
    searchTerm: get(state, 'storage.searchTerm', ''),
  }));

  return (
    <div className={classes.root}>
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
        value={searchTerm}
        onChange={(e) => dispatch({
          payload: e.target.value,
          type: SEARCH_TERM_CHANGE,
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faSearch} className={classes.icon} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default HeaderNav;
