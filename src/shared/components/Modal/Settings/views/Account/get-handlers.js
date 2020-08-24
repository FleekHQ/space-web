import get from 'lodash/get';
import { updateIdentity, uploadProfilePic } from '@events/account';

import { openModal, PROMPT_MODAL } from '../../../actions';

export default (t, dispatch, token) => {
  const onSetDisplayName = () => {
    const modalProps = {
      title: t('modals.settings.account.editDisplayName'),
      onSubmit: (newDisplayName, errors, closeModal) => {
        const payload = {
          token,
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
      token,
      imagePath,
    });
  };

  return {
    onChangeImage,
    onSetDisplayName,
    onChangeUsername,
  };
};
