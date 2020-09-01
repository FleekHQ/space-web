import get from 'lodash/get';
import { updateIdentity, uploadProfilePic } from '@events/account';

import { openModal, PROMPT_MODAL, DELETE_ACCOUNT } from '../../../actions';

export default ({
  t,
  dispatch,
  closeMainModal,
}) => {
  const onSetDisplayName = () => {
    const modalProps = {
      title: t('modals.settings.account.editDisplayName'),
      onSubmit: (newDisplayName, errors, closeModal) => {
        const payload = {
          displayName: newDisplayName,
        };

        updateIdentity(payload);
        closeModal();
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
      title: t('modals.settings.account.editUsername'),
      onSubmit: (newUsername, errors, closeModal) => {
        const payload = {
          username: newUsername,
        };

        updateIdentity(payload);
        closeModal();
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
