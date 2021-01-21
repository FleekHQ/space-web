import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '@ui/Preview/components/TopBar';
import { useTranslation } from 'react-i18next';
import PreviewDetailsPanel from './components/DetailsPanel';

import useStyles from './styles';
import mockFile from './mock';

const FilePreview = () => {
  const classes = useStyles();
  const { hash } = useParams();
  const [file, setFile] = useState(null);
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);
  const { t } = useTranslation();

  const getFileInfo = () => {
    setFile(mockFile);
  };

  useEffect(() => {
    getFileInfo(hash);
  }, []);

  const i18n = {
    signin: t('preview.signIn'),
  };

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

  return (
    <div className={classes.container}>
      {file && (
        <>
          <TopBar
            filename={file.name}
            ext={file.ext}
            onPrint={() => {}}
            onDownload={() => {}}
            onInfo={onInfo}
            onSignIn={() => {}}
            onOptionClick={() => {}}
            showSignin
            i18n={i18n}
          />
          <div className={classes.mainViewContainer}>
            <div className={classes.filePreviewContainer}>MAIN VIEW</div>
            <PreviewDetailsPanel
              object={file}
              expanded={detailsPanelExpanded}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilePreview;
