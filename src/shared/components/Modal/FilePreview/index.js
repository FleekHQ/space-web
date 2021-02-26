import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import TopBar from '@ui/Preview/components/TopBar';
import FilePreviewer from '@ui/FilePreviewer';
import { openFileByUuid } from '@events/objects';
import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import {
  getContextMenuItems,
  downloadFromUrl,
  printFromId,
} from '@utils';
import useMenuItemOnClick from '@utils/use-menu-item-on-click';
import { useTranslation } from 'react-i18next';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { fetchDealId } from '@events/filecoin';

import PreviewDetailsPanel from '../../../../views/FilePreview/components/DetailsPanel';
import useStyles from './styles';

const FilePreview = ({
  closeModal,
  object: baseObject,
  ...props
}) => {
  const classes = useStyles();
  const [object, setObject] = useState(baseObject);
  const [detailsPanelExpanded, setDetailsPanelExpanded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const { t } = useTranslation();
  const downloads = useSelector((state) => state.downloads);

  const menuItemOnClick = useMenuItemOnClick({
    clickedItem: object,
  });

  const getMenuItems = () => {
    const menuOptions = getContextMenuItems({ object, t });
    return menuOptions.filter((item) => item.id !== CONTEXT_OPTION_IDS.preview);
  };

  const getFileInfo = async () => {
    try {
      if (downloads[object.uuid] && downloads[object.uuid].link) {
        setFileUrl(downloads[object.uuid].link);
        return;
      }
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

    if (!object.dealId && !object.proposalCID) {
      fetchDealId(object, true).then((dealId) => setObject({ ...object, ...dealId }));
    }
  }, []);

  const onInfo = () => {
    setDetailsPanelExpanded(!detailsPanelExpanded);
  };

  const onDownload = () => downloadFromUrl(fileUrl, object.name);

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
            onPrint={() => printFromId('print-area')}
            onDownload={onDownload}
            onInfo={onInfo}
            onSignIn={() => {}}
            onOptionClick={menuItemOnClick}
            menuOptions={getMenuItems()}
            onBack={closeModal}
            showSignin={false}
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
                extension={object.ext}
              />
            )}
          </div>
        </div>
        <PreviewDetailsPanel
          object={object}
          expanded={detailsPanelExpanded}
          disablePreview
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
    dealId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    proposalCID: PropTypes.string,
  }).isRequired,
};

export default FilePreview;
