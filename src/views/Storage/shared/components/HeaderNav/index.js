import React, { useState, useEffect, useRef } from 'react';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FolderNavButton from '@ui/FolderNavButton';
import { openObject, searchFiles } from '@events';
import { getShortAddress, useBrowserStatus } from '@utils';
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
import { openModal, EDIT_PROFILE, SETTINGS_MODAL } from '@shared/components/Modal/actions';

import useStyles from './styles';

import {
  getMenuDropdownItems as getAccountItems,
  getOnMenuItemClick as getAccountItemClick,
} from './account-menu-helpers';

const isBackButtonDisabled = (pathname) => {
  const isFileRootPath = /^\/home\/?$/.test(pathname);
  const isSharedRootPath = /^\/shared\/?$/.test(pathname);
  return isFileRootPath || isSharedRootPath;
};

const HeaderNav = () => {
  const [backStepsNumber, setBackStepsNumber] = useState(0);
  const backStepsPrevValue = useRef(0);
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOnline } = useBrowserStatus();

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
      <Box width={219} display="flex" alignItems="center">
        <img width={73} src={`${process.env.PUBLIC_URL}/assets/images/space-logo-black.svg`} alt="space-logo" />
      </Box>
      <Box flex={1} display="flex" alignItems="center">
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
        <Box width="100%" maxWidth={547}>
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
      </Box>
      <Box display="flex" alignItems="center">
        <div className={classes.iconBtnsContainer}>
          <ButtonBase
            onClick={(event) => {
              event.preventDefault();

              window.open('https://docs.space.storage', '_blank', 'noopener,noreferrer');
            }}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </ButtonBase>
          <Notifications />
          <ButtonBase onClick={() => dispatch(openModal(SETTINGS_MODAL))}>
            <FontAwesomeIcon icon={faCog} />
          </ButtonBase>
        </div>
        <Box height="100%" py="5px" ml={1} mr={2} width={1}>
          <Divider light orientation="vertical" />
        </Box>
        <Account
          items={getAccountItems(t)}
          onEdit={() => dispatch(openModal(EDIT_PROFILE, {}))}
          onMenuItemClick={getAccountItemClick({ user, dispatch, linkedAddresses })}
          account={{
            isOnline,
            membersNumber: 0,
            id: user.uuid,
            avatarUrl: user.avatarUrl,
            name: user.displayName || getShortAddress(user.address),
          }}
        />
      </Box>
    </div>
  );
};

export default HeaderNav;
