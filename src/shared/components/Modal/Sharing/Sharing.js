import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { shareItems } from '@events/share';
import BaseModal from '@ui/BaseModal';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import getOptions from './options';
import {
  getCollaboratorsInfo,
  mapIdentitiesToCollaborators,
} from './helpers';
import {
  Header,
  MemberInput,
  CollaboratorList,
} from './components';

/* eslint-disable react/jsx-props-no-spreading */
const SharingModal = (props) => {
  const {
    className,
    closeModal,
    selectedObjects,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const { user, identities } = useSelector((state) => ({
    user: state.user,
    identities: Object.values(state.identities.identities),
  }));

  const collaborators = getCollaboratorsInfo(
    get(selectedObjects, '[0].members', []) || [],
    user,
    identities,
  );

  const [usernames, setUsernames] = useState([]);

  const i18n = {
    memberInput: {
      shareVia: t('modals.sharingModal.shareVia'),
      to: t('modals.sharingModal.to'),
      placeholder: t('modals.sharingModal.inputPlaceholder'),
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

  const onChangeInputPermissions = (...args) => {
    console.log('onChangeInputPermissions', ...args);
  };

  const onClickSettings = () => {
    console.log('click settings');
  };

  /* eslint-disable no-unused-vars */
  const onShare = (members, message) => {
    const payload = {};

    shareItems(payload);
    closeModal();
  };

  return (
    <BaseModal onClose={closeModal} maxWidth={460}>
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        <Header
          ext={get(selectedObjects, '[0].ext', '')}
          className={classes.header}
          onClickSettings={onClickSettings}
        >
          {get(selectedObjects, '[0].name', '')}
        </Header>
        <MemberInput
          options={getOptions(t)}
          i18n={i18n.memberInput}
          className={classes.memberInput}
          onChange={onChangeInputPermissions}
          setUsernames={setUsernames}
          usernames={usernames}
          collaborators={mapIdentitiesToCollaborators(identities)}
        />
        <CollaboratorList
          i18n={i18n.collaboratorList}
          collaborators={collaborators}
          options={getOptions(t, true)}
          className={classes.collaboratorList}
          onChangePermissions={onChangeUserPermissions}
          onShare={onShare}
        />
      </div>
      <div
        className={classes.footer}
      >
        Implement Share Link
      </div>
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
    ext: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
      publicKey: PropTypes.string,
    })),
  })),
};

export default SharingModal;
