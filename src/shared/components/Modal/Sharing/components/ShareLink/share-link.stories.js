import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import ShareLink from './index';

const categoryName = 'ShareLink';

storiesOf(categoryName, module).add('default', () => {
  const Container = () => {
    const [step, setStep] = useState(0);
    const [url, setUrl] = useState();

    const onSave = (password) => {
      setTimeout(() => {
        console.log(password);
        setUrl('space.app-documents/techdocsv2.docx');
        setStep(2);
      }, 2000);
    };

    return (
      <ShareLink
        url={url}
        step={step}
        onSave={onSave}
        defaultStep={step}
        onCreateLink={() => setStep(1)}
        onCancel={() => setStep(0)}
        onReset={() => setStep(1)}
      />
    );
  };

  return (
    <Container />
  );
});
