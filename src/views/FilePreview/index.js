import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '@ui/Preview/components/TopBar';
import { useTranslation } from 'react-i18next';
import FilePreviewer from '@ui/FilePreviewer';

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
          <div className={classes.mainContentContainer}>
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
            <div className={classes.mainContent}>
              <FilePreviewer
                url="https://bitcoin.org/bitcoin.pdf"
                isImage={false}
                // url="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2"
                // isImage
              />
            </div>
          </div>
          <PreviewDetailsPanel
            object={file}
            expanded={detailsPanelExpanded}
          />
        </>
      )}
    </div>
  );
};

export default FilePreview;
