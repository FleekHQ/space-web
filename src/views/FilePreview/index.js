import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TopBar from '@ui/Preview/components/TopBar';
import { useTranslation } from 'react-i18next';
import FilePreviewer from '@ui/FilePreviewer';
import { openFileByUuid } from '@events/objects';
import { useSelector } from 'react-redux';
import { sdk } from '@clients';
import Box from '@material-ui/core/Box';
import { getContextMenuItems, downloadFromUrl } from '@utils';
import useMenuItemOnClick from '@utils/use-menu-item-on-click';

import Splash from '../Splash';
import PreviewDetailsPanel from './components/DetailsPanel';
import useStyles from './styles';

const FilePreview = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { uuid } = useParams();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);
  const { t } = useTranslation();
  const [loadingSdk, setLoadingSdk] = React.useState(true);
  const history = useHistory();
  const menuItemOnClick = useMenuItemOnClick({
    clickedItem: file,
  });

  const redirectToSignin = () => {
    const redirectRoute = `/file/${uuid}`;
    history.push(`/signin?redirect_to=${encodeURIComponent(redirectRoute)}`);
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
      // if there is a user, we show an error
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const initSdk = async () => {
    let sdkUnsubscribe;

    // If there is no user, we generate a temporary user in order to
    // to interact with the SDK, but we don't
    if (!user) {
      const users = await sdk.getUsers();
      const identity = await users.createIdentity();
      await users.authenticate(identity);
    }

    if (sdk.isStarting) {
      sdkUnsubscribe = sdk.onList('ready', (error) => {
        if (!error) {
          setLoadingSdk(false);
          sdkUnsubscribe();
        }
      });
    } else {
      // SDK is already started
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

  const i18n = {
    signin: t('preview.signIn'),
  };

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

  const getMenuItems = () => getContextMenuItems({
    object: file,
    t,
  });

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

  const onDownload = () => downloadFromUrl(fileUrl, file.name);

  return (
    <div className={classes.container}>
      {file && (
        <>
          <div className={classes.mainContentContainer}>
            <TopBar
              filename={file.name}
              ext={file.ext}
              onPrint={() => {}}
              onDownload={onDownload}
              onInfo={onInfo}
              onSignIn={redirectToSignin}
              onOptionClick={menuItemOnClick}
              showSignin={!user}
              i18n={i18n}
              menuOptions={getMenuItems()}
              disableDownload={!fileUrl}
            />
            <div className={classes.mainContent}>
              {fileUrl && (
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
          />
        </>
      )}
    </div>
  );
};

export default FilePreview;
