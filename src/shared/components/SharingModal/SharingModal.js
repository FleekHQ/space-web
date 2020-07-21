import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import getOptions from './options';
import {
  Header,
  EditFooter,
  MemberInput,
  CollaboratorList,
  EmailBodyInput,
  SendEmailFooter,
} from './components';

const SharingModal = (props) => {
  const {
    ext,
    filename,
    shareLink,
    className,
    collaborators,
    onShareLinkClick,
    onChangeUserPermissions,
    onChangeInputPermissions,
    onSendEmailClick,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [emailBody, setEmailBody] = useState('');
  const [showEmailBody, setShowEmailBody] = useState(false);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const i18n = {
    memberInput: {
      to: t('modals.sharingModal.to'),
      placeholder: t('modals.sharingModal.inputPlaceholder'),
    },
    collaboratorList: {
      owner: t('common.owner'),
    },
    footer: {
      canView: t('common.access.view.title'),
      title: t('modals.sharingModal.linkTitle'),
      description: shareLink
        ? t('modals.sharingModal.linkDescription')
        : t('modals.sharingModal.noLinkDescription'),
      cta: shareLink
        ? t('modals.sharingModal.copyLink')
        : t('modals.sharingModal.createLink'),
    },
    email: {
      placeholder: t('modals.sharingModal.emailPlaceholder'),
      shareButton: t('modals.sharingModal.shareEmailButton'),
    },
    emailErrors: {
      invalidEmail: t('modals.sharingModal.errors.invalidEmail'),
      duplicateEmail: t('modals.sharingModal.errors.duplicateEmail'),
    },
  };

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <Header
        ext={ext}
        className={classes.header}
      >
        {filename}
      </Header>
      <MemberInput
        options={getOptions(t)}
        i18n={i18n.memberInput}
        className={classes.memberInput}
        onChange={onChangeInputPermissions}
        setEmailAddresses={setEmailAddresses}
        emailAddresses={emailAddresses}
        showEmailBody={showEmailBody}
        setShowEmailBody={setShowEmailBody}
        setEmailBody={setEmailBody}
        collaborators={collaborators}
        emailErrors={i18n.emailErrors}
      />
      {
        showEmailBody ? (
          <>
            <EmailBodyInput
              placeholder={i18n.email.placeholder}
              setEmailBody={setEmailBody}
              emailBody={emailBody}
            />
            <SendEmailFooter
              className={classes.footer}
              shareButtonText={i18n.email.shareButton}
              onSendEmailClick={() => onSendEmailClick(emailAddresses, emailBody)}
              disabled={emailAddresses.length === 0}
            />
          </>
        ) : (
          <>
            <CollaboratorList
              i18n={i18n.collaboratorList}
              collaborators={collaborators}
              options={getOptions(t, true)}
              className={classes.collaboratorList}
              onChangePermissions={onChangeUserPermissions}
            />
            <EditFooter
              i18n={i18n.footer}
              className={classes.footer}
              onClick={onShareLinkClick}
            />
          </>
        )
      }
    </div>
  );
};

SharingModal.defaultProps = {
  filename: '',
  ext: 'default',
  className: null,
  shareLink: false,
  collaborators: [],
  onShareLinkClick: () => {},
  onChangeUserPermissions: () => {},
  onChangeInputPermissions: () => {},
  onSendEmailClick: () => {},
};

SharingModal.propTypes = {
  ext: PropTypes.string,
  shareLink: PropTypes.bool,
  filename: PropTypes.string,
  className: PropTypes.string,
  onShareLinkClick: PropTypes.func,
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
};

export default SharingModal;
