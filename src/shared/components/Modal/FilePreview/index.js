import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import TopBar from '@ui/Preview/components/TopBar';
import FilePreviewer from '@ui/FilePreviewer';

import PreviewDetailsPanel from '../../../../views/FilePreview/components/DetailsPanel';
import useStyles from './styles';

const FilePreview = ({
  closeModal,
  object,
  ...props
}) => {
  const classes = useStyles();
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

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
              url="https://bitcoin.org/bitcoin.pdf"
              isImage={false}
              // url="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=1fdekAh2"
              // isImage
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
  }).isRequired,
};

export default FilePreview;
