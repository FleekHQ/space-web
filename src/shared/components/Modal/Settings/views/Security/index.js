import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import MessageBox from '@ui/MessageBox';

import { BaseCard } from '../../components';
import { Body, Header, Section } from '../../components/BaseCard/components';

const handleChangePassword = (event) => {
  event.preventDefault();

  // eslint-disable-next-line no-console
  console.log('TODO: Change password integration');
};

const handleDownloadPaperKey = (event) => {
  event.preventDefault();

  // eslint-disable-next-line no-console
  console.log('TODO: Download paper key integration');
};

const Security = ({ t }) => (
  <>
    <BaseCard>
      <Header>
        <Section>
          <Typography variant="body2">
            {t('modals.settings.security.password')}
          </Typography>
        </Section>
        <Section>
          <ButtonBase onClick={handleChangePassword}>
            <Typography variant="body2" color="textSecondary">
              {t('modals.settings.security.changePassword')}
            </Typography>
          </ButtonBase>
        </Section>
      </Header>
    </BaseCard>
    <br />
    <BaseCard>
      <Header>
        <Section>
          <Typography variant="body2">
            {t('modals.settings.security.paperKey')}
          </Typography>
        </Section>
        <Section>
          <ButtonBase onClick={handleDownloadPaperKey}>
            <Typography variant="body2" color="textSecondary">
              {t('modals.settings.security.downloadPaperKey')}
            </Typography>
          </ButtonBase>
        </Section>
      </Header>
      <Body>
        <MessageBox title={t('modals.settings.security.paperKeyTitle')}>
          <Typography variant="body2" color="textPrimary">
            {t('modals.settings.security.paperKeyInfo')}
          </Typography>
        </MessageBox>
      </Body>
    </BaseCard>
  </>
);

Security.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Security;
