import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import getOptions from './options';
import {
  Header,
  Footer,
  MemberInput,
  CollaboratorList,
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
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

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
      />
      <CollaboratorList
        i18n={i18n.collaboratorList}
        collaborators={collaborators}
        options={getOptions(t, true)}
        className={classes.collaboratorList}
        onChangePermissions={onChangeUserPermissions}
      />
      <Footer
        i18n={i18n.footer}
        className={classes.footer}
        onClick={onShareLinkClick}
      />
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
};

export default SharingModal;
