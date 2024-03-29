import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import TopBar from '@ui/Preview/components/TopBar';
import { useTranslation } from 'react-i18next';
import FilePreviewer from '@ui/FilePreviewer';
import { openFileByUuid } from '@events/objects';
import { useSelector } from 'react-redux';
import { sdk } from '@clients';
import Box from '@material-ui/core/Box';
import { getContextMenuItems, downloadFromUrl, printFromId } from '@utils';
import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import useMenuItemOnClick from '@utils/use-menu-item-on-click';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchDealId } from '@events/filecoin';
import queryString from 'query-string';

import Splash from '../Splash';
import PreviewDetailsPanel from './components/DetailsPanel';
import useStyles from './styles';

const FilePreview = () => {
  const classes = useStyles();
  const { uuid } = useParams();
  const [user, fileEntry] = useSelector((state) => {
    const fileObject = state.storage?.buckets?.personal?.objects?.find(
      (entry) => entry.uuid === uuid,
    );

    return [state.user, fileObject];
  });

  const [file, setFile] = useState(fileEntry);
  const [fileUrl, setFileUrl] = useState(null);
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);
  const { t } = useTranslation();
  const [loadingSdk, setLoadingSdk] = React.useState(true);
  const history = useHistory();
  const location = useLocation();
  const menuItemOnClick = useMenuItemOnClick({
    clickedItem: file,
  });

  const redirectToSignin = () => {
    const redirectRoute = `/file/${uuid}`;
    const { temp_key: tempKey } = queryString.parse(location.search);

    const queryParams = {
      redirect_route: redirectRoute,
      temp_key: tempKey,
    };

    const search = queryString.stringify(queryParams);

    history.push({
      pathname: tempKey ? '/signup' : '/signin',
      search: `?${search}`,
    });
  };

  const redirectHome = () => {
    history.push('/home');
  };

  const getFileInfo = async () => {
    try {
      const fileInfo = await openFileByUuid(uuid);
      setFile(fileInfo.entry);

      const url = await fileInfo.getFileUrl();
      setFileUrl(url);
    } catch (e) {
      // if there is no user, we redirect to sign in
      if (!user) {
        // redirect user to sign in page
        redirectToSignin();
        return;
      }
      redirectHome();
    }
  };

  const initUser = async () => {
    // If there is no user, we generate a temporary user in order to
    // to interact with the SDK, but we don't
    if (!user) {
      const users = await sdk.getUsers();
      const identity = await users.createIdentity();
      await users.authenticate(identity);
    }
  };

  const initSdk = async () => {
    let sdkUnsubscribe;

    if (sdk.isStarting) {
      sdkUnsubscribe = sdk.onListen('ready', async (error) => {
        if (!error) {
          await initUser();
          setLoadingSdk(false);
          sdkUnsubscribe();
        }
      });
    } else {
      // SDK is already started
      initUser();
      setLoadingSdk(false);
    }

    return () => {
      if (sdkUnsubscribe) {
        sdkUnsubscribe();
      }
    };
  };

  useEffect(() => {
    initSdk();
  }, []);

  useEffect(() => {
    if (!loadingSdk) {
      getFileInfo();
    }
  }, [loadingSdk]);

  useEffect(() => {
    if (file?.bucket && file?.fullKey) {
      fetchDealId(file).then((dealId) => setFile({ ...file, ...dealId }));
    }
  }, [file?.fullKey]);

  const i18n = {
    signin: t('preview.signIn'),
  };

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

  const getMenuItems = () => {
    const menuOptions = getContextMenuItems({ object: file, t });
    return menuOptions
      .filter((item) => item.id !== CONTEXT_OPTION_IDS.preview)
      .filter((item) => item.id !== CONTEXT_OPTION_IDS.share);
  };

  if (!file) {
    return (
      <Box
        display="flex"
        width="100%"
        height="100vh"
        position="absolute"
        zIndex={9999}
        justifyContent="center"
      >
        <Splash />
      </Box>
    );
  }

  const onDownload = () => {
    window.analytics.track('Shared file downloaded');
    downloadFromUrl(fileUrl, file.name);
  };

  return (
    <div className={classes.container}>
      {file && (
        <>
          <div className={classes.mainContentContainer}>
            <TopBar
              filename={file.name}
              ext={file.ext}
              onPrint={() => printFromId('print-area')}
              onDownload={onDownload}
              onInfo={onInfo}
              onSignIn={redirectToSignin}
              onOptionClick={menuItemOnClick}
              showSignin={!user}
              i18n={i18n}
              menuOptions={getMenuItems()}
              disableDownload={!fileUrl}
              disablePrint={!fileUrl}
            />
            <div className={classes.mainContent}>
              {!fileUrl ? (
                <FontAwesomeIcon
                  spin
                  icon={faSpinnerThird}
                  className={classes.spinner}
                />
              ) : (
                <FilePreviewer
                  url={fileUrl}
                  extension={file.ext}
                />
              )}
            </div>
          </div>
          <PreviewDetailsPanel
            object={file}
            expanded={detailsPanelExpanded}
            showTitle
            onClose={() => setDetailsPanelExpanded(false)}
            disablePreview
            disableShare
          />
        </>
      )}
    </div>
  );
};

export default FilePreview;
