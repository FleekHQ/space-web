import { updateIdentity, uploadProfilePic } from '@events/account';

import { openModal, PROMPT_MODAL } from '../../../actions';

export default (t, dispatch, address, token) => {
  const onSetDisplayName = () => {
    const modalProps = {
      title: t('modals.settings.account.editDisplayName'),
      onSubmit: (newDisplayName, errors, closeModal) => {
        const payload = {
          token,
          address,
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
          token,
          address,
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
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append('image', image);

    uploadProfilePic({
      token,
      address,
      formData,
    });
  };

  return {
    onChangeImage,
    onSetDisplayName,
    onChangeUsername,
  };
};
