import React from 'react';

import {
  CopyLink,
  CreateLinkButton,
  PasswordLinkForm,
} from './components';

const getContent = (props) => {
  const {
    url,
    step,
    onSave,
    onCancel,
    onCreateLink,
  } = props;

  const copyLink = <CopyLink url={url} />;
  const createLinkButton = <CreateLinkButton onClick={onCreateLink} />;
  const passwordLinkForm = (
    <PasswordLinkForm
      onCancel={onCancel}
      onSave={onSave}
    />
  );

  const steps = {
    0: createLinkButton,
    1: passwordLinkForm,
    2: copyLink,
  };

  return steps[step];
};

export default getContent;
