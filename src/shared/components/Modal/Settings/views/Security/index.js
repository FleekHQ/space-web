import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import { OPTION_IDS } from '@shared/components/Modal/AddBackupSignIn/constants';
import { faKey } from '@fortawesome/pro-solid-svg-icons/faKey';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@terminal-packages/space-ui/core/Button';
import AddBackUpSignIn from '@shared/components/Modal/AddBackupSignIn';
import classnames from 'classnames';
import MessageBox from '@ui/MessageBox';

import useStyles from './styles';
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
    [OPTION_IDS.EMAIL]: false,
    [OPTION_IDS.USERNAME]: false,
    [OPTION_IDS.GOOGLE]: false,
    [OPTION_IDS.TWITTER]: false,
    [OPTION_IDS.SEED_PHRASE]: false,
    addBackUpSignIn: false,
  });

  const classes = useStyles();

  const [error, setError] = useState(false);

  const onClickNewMethod = () => {
    // Do stuff...
    setError(false);
  };

  const options = ({
    [OPTION_IDS.EMAIL]: {
      id: OPTION_IDS.EMAIL,
      text: t('addBackupSignIn.email'),
      text2: 's***********a@gmail.com',
      text3: t('modals.settings.security.disconnect'),
      redText3: true,
      icon: faEnvelope,
    },
    [OPTION_IDS.USERNAME]: {
      id: OPTION_IDS.USERNAME,
      text: t('modals.settings.security.space'),
      text2: 'samuele',
      text3: t('modals.settings.security.changePassword'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/space-branding/space-logo.svg',
    },
    [OPTION_IDS.GOOGLE]: {
      id: OPTION_IDS.GOOGLE,
      text: t('addBackupSignIn.google'),
      text2: 's***********a@gmail.com',
      text3: t('modals.settings.security.disconnect'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Google__G__Logo.svg',
      redText3: true,
    },
    [OPTION_IDS.TWITTER]: {
      id: OPTION_IDS.TWITTER,
      text: t('addBackupSignIn.twitter'),
      text2: '@s*m',
      text3: t('modals.settings.security.disconnect'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Twitter_Logo_Blue.svg',
      redText3: true,
    },
    [OPTION_IDS.SEED_PHRASE]: {
      id: OPTION_IDS.SEED_PHRASE,
      text: t('addBackupSignIn.seedPhrase'),
      text3: t('modals.settings.security.seedPhrase'),
      icon: faKey,
    },
  });

  const modalOptions = Object.keys(OPTION_IDS).filter((optionId) => {
    const isOptionNotAdded = !options[optionId];
    const isTwitter = optionId === OPTION_IDS.TWITTER;
    const isGoogle = optionId === OPTION_IDS.GOOGLE;

    return (isOptionNotAdded || isTwitter || isGoogle);
  });

  return (
    <>
      {(Object.keys(options).length < 2) && (
        <div className={classes.messageBox}>
          <MessageBox
            type="shield"
            isRainbow
            title={t('modals.settings.security.warning.title')}
          >
            <Typography className={classes.warningDescription}>
              {t('modals.settings.security.warning.description')}
            </Typography>
            <Button
              id="addBackUpSignIn"
              variant="primary"
              onClick={handleModals({ setState })}
            >
              {t('modals.settings.security.warning.button')}
            </Button>
          </MessageBox>
        </div>
      )}
      <BaseCard>
        <Header>
          <Section>
            <Typography className={classes.title}>
              {t('modals.settings.security.signIn')}
            </Typography>
          </Section>
          <Section>
            <Button
              id="addBackUpSignIn"
              variant="primary"
              onClick={handleModals({ setState })}
            >
              {t('modals.settings.security.addNew')}
            </Button>
          </Section>
        </Header>
        <Body>
          {Object.keys(options).map((optionId) => {
            const option = options[optionId];
            return (
              <div key={option.id}>
                <Divider className={classes.divider} />
                <div className={classes.methodContainer}>
                  <div className={classes.titleLogoContainer}>
                    {option.imgSrc && (
                      <img alt={option.id} src={option.imgSrc} className={classes.image} />
                    )}
                    {option.icon && (
                      <div className={classes.optionIconContainer}>
                        <FontAwesomeIcon
                          icon={option.icon}
                          className={classes[`${OPTION_IDS[option.id]}`]}
                        />
                      </div>
                    )}
                    <Typography
                      className={classes.optionTitle}
                    >
                      {option.text}
                    </Typography>
                  </div>
                  <Typography>{option.text2}</Typography>
                  <ButtonBase>
                    <Typography
                      onClick={handleModals({ setState })}
                      id={option.id}
                      className={classnames(classes.optionText3, {
                        [classes.redText]: !!option.redText3,
                      })}
                    >
                      {option.text3}
                    </Typography>
                  </ButtonBase>
                </div>
              </div>
            );
          })}
          <Divider className={classes.divider} />
        </Body>
      </BaseCard>
      {error && (
        <BaseCard className={classes.errorContainer}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className={classes.errorIcon}
          />
          <Typography className={classes.errorText}>
            {t('modals.settings.security.addNewError')}
          </Typography>
        </BaseCard>
      )}
      {
        state[OPTION_IDS.SEED_PHRASE] && (
          <SeedPhraseModal
            t={t}
            closeModal={() => (
              setState((prevState) => ({ ...prevState, [OPTION_IDS.SEED_PHRASE]: false }))
            )}
          />
        )
      }
      {
        state[OPTION_IDS.USERNAME] && (
          <ChangePasswordModal
            closeModal={() => (
              setState((prevState) => ({ ...prevState, [OPTION_IDS.USERNAME]: false }))
            )}
          />
        )
      }
      {
        state.addBackUpSignIn && (
          <AddBackUpSignIn
            options={modalOptions}
            onClickContinue={onClickNewMethod}
            closeModal={() => (
              setState((prevState) => ({ ...prevState, addBackUpSignIn: false }))
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
