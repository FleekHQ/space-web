import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Collaborator from './index';

const categoryName = 'Collaborator';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    mainText: text('mainText', 'Main Text'),
    secondaryText: text('secondaryText', 'Secondary Text'),
    imageSrc: text('imageSrc', 'https://aboutfaceskincare.com/wp-content/uploads/2019/11/About-Face-Skincare1172_pp-1-e1574785727292.jpg'),
  };

  return (
    <Collaborator {...defaultProps} />
  );
});
