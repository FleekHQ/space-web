import React, { useState, useEffect, useRef } from 'react';
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
import Notifications from '@shared/components/Notifications';

import useStyles from './styles';

const isBackButtonDisabled = (pathname) => {
  const isFileRootPath = /^\/storage\/files\/?$/.test(pathname);
  const isSharedRootPath = /^\/storage\/shared-by\/?$/.test(pathname);
  return isFileRootPath || isSharedRootPath;
};

const HeaderNav = () => {
  const [backStepsNumber, setBackStepsNumber] = useState(0);
  const backStepsPrevValue = useRef(0);
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { location } = history;

  const { searchTerm } = useSelector((state) => ({
    searchTerm: get(state, 'storage.searchTerm', ''),
  }));

  useEffect(() => {
    // user didn't use back/forward buttons if:
    // pathname has changed but backStepsNumber didn't
    if (backStepsPrevValue.current === backStepsNumber) {
      setBackStepsNumber(0);
    }
    backStepsPrevValue.current = backStepsNumber;
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <FolderNavButton
        direction="back"
        disabled={isBackButtonDisabled(location.pathname)}
        onClick={() => {
          setBackStepsNumber((prevValue) => prevValue + 1);
          history.goBack();
        }}
      />
      <FolderNavButton
        direction="forward"
        disabled={backStepsNumber === 0}
        className={classes.forwardButton}
        onClick={() => {
          setBackStepsNumber((prevValue) => prevValue - 1);
          history.goForward();
        }}
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
      <Notifications />
    </div>
  );
};

export default HeaderNav;
