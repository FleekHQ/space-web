import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseModal from '@ui/BaseModal';
import ErrorCard from '@ui/ErrorCard';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentlyMembers } from '@events/identities';
import { SHARE_TYPES } from '@reducers/details-panel/share';
import { openToast } from '@shared/components/Toast/actions';
import { PUBLIC_LINK_ACTION_TYPES } from '@reducers/public-file-link';
import { shareFiles, setFileAccess } from '@events';
import { openModal, SHARE_PROGRESS_TOAST } from '@shared/components/Modal/actions';

import useStyles from './styles';
import getOptions, { getShareLinkOptions } from './options';
import {
  getCollaboratorsInfo,
} from './helpers';
import {
  Header,
  ShareLink,
  MemberInput,
  CollaboratorList,
} from './components';

import useIdentitiesByNameOrEmail from './use-identities-by-name-email';

/* eslint-disable react/jsx-props-no-spreading */
const SharingModal = (props) => {
  const {
    className,
    closeModal,
    selectedObjects,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    loading,
    identities,
    selectedIdentities,
    onSelectIdentity,
    onRemoveSelectedIdentity,
    onChangeSearchIdentityTerm,
  } = useIdentitiesByNameOrEmail();

  const {
    user,
    publicFileLink,
  } = useSelector((s) => ({
    user: s.user,
    publicFileLink: s.publicFileLink,
  }));

  const collaborators = getCollaboratorsInfo(
    // get(selectedObjects, '[0].members', []) || [],
    user,
    selectedIdentities,
  );

  const [shareLinkOptions, setShareLinkOptions] = useState(
    getShareLinkOptions({ t, selectedObject: selectedObjects[0] }),
  );

  const selectedShareLinkOption = shareLinkOptions.find(
    (option) => option.selected,
  ) || shareLinkOptions[0];

  const onShareLinkOptionClick = (option) => {
    setFileAccess({
      path: `/${selectedObjects[0].key}`,
      bucket: selectedObjects[0].bucket,
      allowAccess: option.id === 'public',
    });
    setShareLinkOptions(shareLinkOptions.map((opt) => ({
      ...opt,
      selected: opt.id === option.id,
    })));
  };

  const { error } = publicFileLink;

  const i18n = {
    memberInput: {
      shareVia: t('modals.sharingModal.shareVia'),
      to: t('modals.sharingModal.to'),
      placeholder: t('modals.sharingModal.inputPlaceholder'),
      search: t('modals.sharingModal.search'),
      notFound: t('modals.sharingModal.notFound'),
    },
    collaboratorList: {
      owner: t('common.owner'),
      shareButton: t('modals.sharingModal.shareEmailButton'),
    },
  };

  /* eslint-disable no-console */
  const onChangeUserPermissions = (...args) => {
    console.log('onChangeUserPermissions', ...args);
  };

  const onShare = (event) => {
    event.preventDefault();
    const notificationId = `${new Date().getTime()}`;

    dispatch(shareFiles({
      notificationId,
      senderName: user.displayName,
      origin: window.location.origin,
      paths: [{
        dbId: selectedObjects[0].dbId,
        bucket: selectedObjects[0].bucket,
        path: `/${selectedObjects[0].key}`,
        fileName: selectedObjects[0].name,
        uuid: selectedObjects[0].uuid,
      }],
      publicKeys: selectedIdentities.map((identity) => ({
        id: identity.uuid,
        pk: identity.publicKey || '',
        email: identity.mainText,
      })),
    }));

    dispatch({
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY,
      payload: {
        id: notificationId,
        files: selectedObjects,
      },
    });
    dispatch(openModal(SHARE_PROGRESS_TOAST, { notificationId }));
    closeModal();
  };

  React.useEffect(() => {
    fetchRecentlyMembers();

    return () => {
      dispatch({
        type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_RESTART,
      });
    };
  }, []);

  return (
    <BaseModal
      onClose={closeModal}
      maxWidth={460}
      paperProps={{
        className: classes.paperModal,
        elevation: 0,
      }}
    >
      <Paper
        elevation={0}
        className={classnames(
          classes.root,
          className,
        )}
      >
        <Header
          ext={get(selectedObjects, '[0].ext', '')}
          className={classes.header}
        >
          {get(selectedObjects, '[0].name', '')}
        </Header>
        <MemberInput
          loading={loading}
          i18n={i18n.memberInput}
          className={classes.memberInput}
          identities={identities}
          onSelectIdentity={onSelectIdentity}
          onChangeSearchIdentityTerm={onChangeSearchIdentityTerm}
        />
        <CollaboratorList
          i18n={i18n.collaboratorList}
          collaborators={collaborators}
          options={getOptions(t, true)}
          className={classes.collaboratorList}
          onChangePermissions={onChangeUserPermissions}
          onShare={onShare}
          hasUsers={selectedIdentities.length > 0}
          onRemoveSelectedIdentity={onRemoveSelectedIdentity}
        />
      </Paper>
      <Paper
        elevation={0}
        className={classes.footer}
      >
        <ShareLink
          options={shareLinkOptions}
          onClickCopyLink={() => dispatch(openToast({
            message: t('modals.sharingModal.shareLink.linkCopied'),
          }))}
          i18n={{
            title: t('modals.sharingModal.shareLink.title'),
            copyLink: t('modals.sharingModal.shareLink.copyLink'),
          }}
          icon={selectedShareLinkOption.id}
          onOptionClick={onShareLinkOptionClick}
          url={`${window.location.origin}/file/${selectedObjects[0].uuid}`}
        />
      </Paper>
      {error && (
        <ErrorCard
          className={classes.error}
          message={t('modals.sharingModal.errors.failedShare')}
        />
      )}
    </BaseModal>
  );
};

SharingModal.defaultProps = {
  className: null,
  selectedObjects: [],
};

SharingModal.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  selectedObjects: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ext: PropTypes.string,
    dbId: PropTypes.string,
    uuid: PropTypes.string,
    name: PropTypes.string,
    bucket: PropTypes.string,
    sourceBucket: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
      publicKey: PropTypes.string,
    })),
  })),
};

export default SharingModal;
