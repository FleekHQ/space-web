import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import MessageBox from '@ui/MessageBox';
import SeedPhraseModal from '../../../SeedPhrase';
import ChangePasswordModal from '../../../ChangePassword';
import {
  Body,
  Header,
  Section,
  BaseCard,
} from '../../components';

const handleModals = ({ setState }) => (event) => {
  event.preventDefault();

  setState((prevState) => ({
    ...prevState,
    [event.currentTarget.id]: true,
  }));
};

const Security = ({ t }) => {
  const [state, setState] = React.useState({
    showPasswordModal: false,
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
            <ButtonBase
              id="showPasswordModal"
              onClick={handleModals({ setState })}
            >
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
            <ButtonBase
              id="showSeedPhraseModal"
              onClick={handleModals({ setState })}
            >
              <Typography variant="body2" color="textSecondary">
                {t('modals.settings.security.downloadPaperKey')}
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
        <Body>
          <MessageBox type="info" title={t('modals.settings.security.paperKeyTitle')}>
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
            closeModal={() => (
              setState((prevState) => ({ ...prevState, showSeedPhraseModal: false }))
            )}
          />
        )
      }
      {
        state.showPasswordModal && (
          <ChangePasswordModal
            closeModal={() => (
              setState((prevState) => ({ ...prevState, showPasswordModal: false }))
            )}
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
