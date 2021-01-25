import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import TopBar from '@ui/Preview/components/TopBar';
import FilePreviewer from '@ui/FilePreviewer';
import { openFileByUuid } from '@events/objects';
import { imgExtensions } from '../../../../views/FilePreview/constants';

import PreviewDetailsPanel from '../../../../views/FilePreview/components/DetailsPanel';
import useStyles from './styles';

const FilePreview = ({
  closeModal,
  object,
  ...props
}) => {
  const classes = useStyles();
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const getFileInfo = async () => {
    try {
      const fileInfo = await openFileByUuid(object.uuid);
      const url = await fileInfo.getFileUrl();
      setFileUrl(url);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    getFileInfo();
  }, []);

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

  const getIsImage = () => imgExtensions.includes(object.ext);

  return (
    <Modal
      disableBackdropClick
      onClose={closeModal}
      open
      BackdropProps={{
        style: {
          backgroundColor: '#000',
          opacity: '0.85',
        },
        'data-prevent-details-panel-collapse': true,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <div className={classes.container}>
        <div className={classes.mainContentContainer}>
          <TopBar
            filename={object.name}
            ext={object.ext}
            onPrint={() => {}}
            onDownload={() => {}}
            onInfo={onInfo}
            onSignIn={() => {}}
            onOptionClick={() => {}}
            onBack={closeModal}
            showSignin={false}
          />
          <div className={classes.mainContent}>
            <FilePreviewer
              url={fileUrl}
              isImage={getIsImage()}
            />
          </div>
        </div>
        <PreviewDetailsPanel
          object={object}
          expanded={detailsPanelExpanded}
        />
      </div>
    </Modal>
  );
};

FilePreview.propTypes = {
  closeModal: PropTypes.func.isRequired,
  object: PropTypes.shape({
    name: PropTypes.string,
    ext: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
};

export default FilePreview;