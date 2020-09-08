import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadProgressModal from './UploadProgress';
import SharingProgressModal from './SharingProgress';
import SettingsModal from './Settings';
import SharingModal from './Sharing';
import PromptModal from './Prompt';
import CreateFolder from './CreateFolder';
import DeleteAccountConfirmation from './DeleteAccountConfirmation';
import SignoutConfirmation from './SignoutConfirmation';
import ErrorModal from './Error';
import useStyles from './styles';

import {
  closeModal as closeModalAction,
  UPLOAD_PROGRESS_TOAST,
  SHARE_PROGRESS_TOAST,
  SETTINGS_MODAL,
  SHARING_MODAL,
  PROMPT_MODAL,
  CREATE_FOLDER,
  DELETE_ACCOUNT,
  SIGNOUT_CONFIRMATION,
  ERROR_MODAL_TOAST,
} from './actions';

const MODALS = {
  [UPLOAD_PROGRESS_TOAST]: UploadProgressModal,
  [SHARE_PROGRESS_TOAST]: SharingProgressModal,
  [SETTINGS_MODAL]: SettingsModal,
  [SHARING_MODAL]: SharingModal,
  [PROMPT_MODAL]: PromptModal,
  [CREATE_FOLDER]: CreateFolder,
  [DELETE_ACCOUNT]: DeleteAccountConfirmation,
  [SIGNOUT_CONFIRMATION]: SignoutConfirmation,
  [ERROR_MODAL_TOAST]: ErrorModal,
};

const getModalsComponents = (modals, dispatch) => modals.map(({ id, type, props }) => {
  const ModalComponent = MODALS[type];
  const closeModal = () => dispatch(closeModalAction(id));

  return (
    <ModalComponent
      open
      key={id}
      closeModal={closeModal}
      id={id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

const isItToast = (modal) => modal.type.split('_').slice(-1)[0] === 'TOAST';

const Modal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allModals = useSelector((state) => state.modals);
  const toasts = allModals.filter(isItToast).reverse();
  const otherModals = allModals.filter((modal) => !isItToast(modal));

  return (
    <>
      {getModalsComponents(otherModals, dispatch)}
      <div className={classes.toastsContainer}>
        {getModalsComponents(toasts, dispatch)}
      </div>
    </>
  );
};

export default Modal;
