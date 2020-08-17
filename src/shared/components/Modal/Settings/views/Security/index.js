import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import MessageBox from '@ui/MessageBox';

import {
  Body,
  Header,
  Section,
  BaseCard,
  SeedPhraseModal,
} from '../../components';

const handleChangePassword = (event) => {
  event.preventDefault();

  // eslint-disable-next-line no-console
  console.log('TODO: Change password integration');
};

const handleSeedPhrase = ({ setState }) => (event) => {
  event.preventDefault();

  setState((prevState) => ({
    ...prevState,
    showSeedPhraseModal: true,
  }));
};

const Security = ({ t }) => {
  const [state, setState] = React.useState({
    showSeedPhraseModal: false,
  });

  return (
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
            <ButtonBase onClick={handleSeedPhrase({ setState })}>
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
      {
        state.showSeedPhraseModal && (
          <SeedPhraseModal
            t={t}
            onDone={() => setState((prevState) => ({ ...prevState, showSeedPhraseModal: false }))}
          />
        )
      }
    </>
  );
};

Security.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Security;
