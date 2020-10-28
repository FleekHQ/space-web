import React, { useState, useEffect, useRef } from 'react';
import { openObject } from '@events';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import FolderNavButton from '@ui/FolderNavButton';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, matchPath } from 'react-router-dom';
import Notifications from '@shared/components/Notifications';
import SearchBar from '@terminal-packages/space-ui/core/SearchBar';

import useStyles from './styles';
import { fetchResults } from './actions';

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

  const { searchTerm, results } = useSelector((state) => ({
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
      ? ['storage', 'files']
      : ['storage', 'shared-by'];

    const redirectPath = `/${[...basePath, ...folderPath].join('/')}`;
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
    });
  };

  const noResults = (
    <Typography className={classes.noResults}>
      <Box fontSize={12}>
        {t('common.noResults')}
      </Box>
    </Typography>
  );

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
      <SearchBar
        debounce={200}
        results={results}
        value={searchTerm}
        noResults={noResults}
        placeholder={t('common.search')}
        onChange={(val) => dispatch(fetchResults(val))}
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
      <Notifications />
    </div>
  );
};

export default HeaderNav;
