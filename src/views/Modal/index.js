import React from 'react';
import { useParams } from 'react-router-dom';

import { Sharing, modalKeys } from './modals';

const modals = {
  [modalKeys.sharing]: Sharing,
  default: Sharing,
};

const Modal = () => {
  const { modalKey } = useParams();

  const ModalComponent = modals[modalKey] || modals.default;

  return (
    <ModalComponent />
  );
};

export default Modal;
