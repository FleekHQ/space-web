import React, { useState, useEffect, useRef } from 'react';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FolderNavButton from '@ui/FolderNavButton';
import { openObject, searchFiles } from '@events';
import { getShortAddress } from '@utils';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory, matchPath } from 'react-router-dom';
import Notifications from '@shared/components/Notifications';
import SearchBar from '@terminal-packages/space-ui/core/SearchBar';
import Account from '@terminal-packages/space-ui/core/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { faQuestionCircle } from '@fortawesome/pro-regular-svg-icons/faQuestionCircle';

import useStyles from './styles';

import {
  getOnUserLogout,
  getOnSignoutReset,
  getMenuDropdownItems as getAccountItems,
  getOnMenuItemClick as getAccountItemClick,
} from './account-menu-helpers';

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

  const {
    searchTerm,
    results,
    user,
    linkedAddresses,
  } = useSelector((state) => ({
    user: state.user,
    linkedAddresses: state.linkedAddresses,
    results: state.search.results,
    searchTerm: state.search.searchTerm,
  }));

  const { location } = history;

  useEffect(() => {
    // user didn't use back/forward buttons if:
    // pathname has changed but backStepsNumber didn't
    if (backStepsPrevValue.current === backStepsNumber) {
      setBackStepsNumber(0);
    }
    backStepsPrevValue.current = backStepsNumber;
  }, [location.pathname]);

  const navigateToFolder = (item, _history) => {
    const folderPath = item.type === 'folder'
      ? item.key.split('/')
      : item.key.split('/').slice(0, -1);

    const basePath = item.sourceBucket === 'personal'
      ? '/home'
      : '/shared';

    const redirectPath = path.posix.join(basePath, ...folderPath);
    const isSamePath = matchPath(redirectPath, { path: _history.location.pathname, exact: true });

    if (!isSamePath) {
      _history.push(redirectPath);
    }
  };

  const openItem = (item) => {
    if (item.type === 'folder') return;
    const fileBucket = item.sourceBucket || item.bucket;

    openObject({
      path: item.key,
      dbId: item.dbId,
      bucket: fileBucket,
      name: item.name,
      ipfsHash: item.ipfsHash,
      isPublicLink: item.isPublicLink,
      fullKey: item.fullKey,
    });
  };

  const noResults = (
    <Typography className={classes.noResults} color="secondary">
      {t('common.noResults')}
    </Typography>
  );

  return (
    <div className={classes.root}>
      <img width={24} src={`${process.env.PUBLIC_URL}/assets/images/space.svg`} alt="space-logo" />
      <Box display="flex" alignItems="center">
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
        <SearchBar
          debounce={200}
          results={results}
          value={searchTerm}
          noResults={noResults}
          placeholder={t('common.search')}
          onChange={(val) => searchFiles(val)}
          mapItemToFileItemProps={(item) => ({
            ext: item.ext,
            key: item.id,
            fileName: item.key,
          })}
          onClickResult={(item, hideResults) => {
            navigateToFolder(item, history);
            openItem(item);
            hideResults();
          }}
          classes={{
            root: classes.rootSearchBar,
            resultContainer: classes.resultContainer,
          }}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <div className={classes.iconBtnsContainer}>
          <ButtonBase>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </ButtonBase>
          <Notifications />
          <ButtonBase>
            <FontAwesomeIcon icon={faCog} />
          </ButtonBase>
        </div>
        <Box height="100%" py="5px" ml={1} mr={2} width={1}>
          <Divider light orientation="vertical" />
        </Box>
        <Account
          signoutState={{ success: false }}
          items={getAccountItems(t)}
          label={t('account.personal')}
          onUserLogout={getOnUserLogout(dispatch)}
          onSignoutReset={getOnSignoutReset(dispatch)}
          onMenuItemClick={getAccountItemClick({ user, dispatch, linkedAddresses })}
          account={{
            membersNumber: 0,
            id: user.username,
            name: user.username || getShortAddress(user.address),
          }}
        />
      </Box>
    </div>
  );
};

export default HeaderNav;
