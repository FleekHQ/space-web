import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadProgressModal from './UploadProgress';
import SharingProgressModal from './SharingProgress';
import SharingModal from './Sharing';
import useStyles from './styles';

import {
  closeModal as closeModalAction,
  UPLOAD_PROGRESS_TOAST,
  SHARE_PROGRESS_TOAST,
  SHARING_MODAL,
} from './actions';

const MODALS = {
  [UPLOAD_PROGRESS_TOAST]: UploadProgressModal,
  [SHARE_PROGRESS_TOAST]: SharingProgressModal,
  [SHARING_MODAL]: SharingModal,
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
