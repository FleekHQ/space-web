import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadProgressModal from './UploadProgress';
import SharingModal from './Sharing';

import {
  closeModal as closeModalAction,
  UPLOAD_PROGRESS_MODAL,
  SHARING_MODAL,
} from './actions';

const MODALS = {
  [UPLOAD_PROGRESS_MODAL]: UploadProgressModal,
  [SHARING_MODAL]: SharingModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);

  return modals.map(({ id, type, props }) => {
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
};

export default Modal;
