import get from 'lodash/get';
import { updateIdentity, uploadProfilePic } from '@events/account';

import { openModal, PROMPT_MODAL, DELETE_ACCOUNT } from '../../../actions';

export default ({
  t,
  username,
  dispatch,
  closeMainModal,
}) => {
  const onSetDisplayName = () => {
    const modalProps = {
      title: t('modals.settings.account.editDisplayName'),
      onSubmit: (newDisplayName) => {
        const payload = {
          displayName: newDisplayName,
        };

        updateIdentity(payload);
      },
      validateOnChange: false,
      validateOnSubmit: false,
      i18n: {
        cancel: t('common.cancel'),
        submit: t('common.confirm'),
        label: t('modals.settings.account.displayNameLable'),
      },
    };

    dispatch(openModal(PROMPT_MODAL, modalProps));
  };

  const onChangeUsername = () => {
    const modalProps = {
      title: username && username.length > 0 ? t('modals.settings.account.editUsername') : t('modals.settings.account.setUsername'),
      onSubmit: (newUsername) => {
        const payload = {
          username: newUsername,
        };

        updateIdentity(payload);
      },
      validateOnChange: false,
      validateOnSubmit: false,
      i18n: {
        cancel: t('common.cancel'),
        submit: t('common.confirm'),
        label: t('modals.settings.account.usernameLabel'),
      },
    };

    dispatch(openModal(PROMPT_MODAL, modalProps));
  };

  const onChangeImage = (e) => {
    const imagePath = get(e, 'target.files[0].path');

    uploadProfilePic({
      imagePath,
    });
  };

  const onDeleteAccount = (e) => {
    e.preventDefault();

    dispatch(openModal(DELETE_ACCOUNT, { closeMainModal }));
  };

  return {
    onChangeImage,
    onDeleteAccount,
    onSetDisplayName,
    onChangeUsername,
  };
};
