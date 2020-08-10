import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import getOptions from './options';
import {
  Header,
  MemberInput,
  CollaboratorList,
} from './components';

import ShareLink from '../../../views/Modal/modals/Sharing/components/ShareLink';

/* eslint-disable react/jsx-props-no-spreading */
const SharingModal = (props) => {
  const {
    ext,
    filename,
    className,
    collaborators,
    onChangeUserPermissions,
    onChangeInputPermissions,
    onSendEmailClick,
    onClickSettings,
    ...shareLinkProps
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

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

  return (
    <div>
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        <Header
          ext={ext}
          className={classes.header}
          onClickSettings={onClickSettings}
        >
          {filename}
        </Header>
        <MemberInput
          options={getOptions(t)}
          i18n={i18n.memberInput}
          className={classes.memberInput}
          onChange={onChangeInputPermissions}
          setUsernames={setUsernames}
          usernames={usernames}
          collaborators={collaborators}
        />
        <CollaboratorList
          i18n={i18n.collaboratorList}
          collaborators={collaborators}
          options={getOptions(t, true)}
          className={classes.collaboratorList}
          onChangePermissions={onChangeUserPermissions}
          onSendEmailClick={onSendEmailClick}
        />
      </div>
      <div
        className={classes.footer}
      >
        <ShareLink
          {...shareLinkProps}
        />
      </div>
    </div>
  );
};

SharingModal.defaultProps = {
  filename: '',
  ext: 'default',
  className: null,
  collaborators: [],
  onChangeUserPermissions: () => {},
  onChangeInputPermissions: () => {},
  onSendEmailClick: () => {},
  onClickSettings: () => {},
};

SharingModal.propTypes = {
  ext: PropTypes.string,
  filename: PropTypes.string,
  className: PropTypes.string,
  onChangeUserPermissions: PropTypes.func,
  onChangeInputPermissions: PropTypes.func,
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
  onSendEmailClick: PropTypes.func,
  onClickSettings: PropTypes.func,
};

export default SharingModal;
