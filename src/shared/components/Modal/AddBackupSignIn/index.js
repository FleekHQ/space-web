import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@terminal-packages/space-ui/core/BaseModal';
import Typography from '@material-ui/core/Typography';
import Button from '@terminal-packages/space-ui/core/Button';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faKey } from '@fortawesome/pro-solid-svg-icons/faKey';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope';
import classnames from 'classnames';
import { OPTION_IDS } from './constants';

import useStyles from './styles';

const AddBackUpSignIn = ({
  closeModal,
  options,
  onClickContinue,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  const signInMethods = {
    [OPTION_IDS.EMAIL]: {
      id: OPTION_IDS.EMAIL,
      text: t('addBackupSignIn.email'),
      icon: faEnvelope,
    },
    [OPTION_IDS.USERNAME]: {
      id: OPTION_IDS.USERNAME,
      text: t('addBackupSignIn.username'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/space-branding/space-logo.svg',
    },
    [OPTION_IDS.GOOGLE]: {
      id: OPTION_IDS.GOOGLE,
      text: t('addBackupSignIn.google'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Google__G__Logo.svg',
    },
    [OPTION_IDS.TWITTER]: {
      id: OPTION_IDS.TWITTER,
      text: t('addBackupSignIn.twitter'),
      imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Twitter_Logo_Blue.svg',
    },
    [OPTION_IDS.SEED_PHRASE]: {
      id: OPTION_IDS.SEED_PHRASE,
      text: t('addBackupSignIn.seedPhrase'),
      text2: t('addBackupSignIn.morePrivate'),
      icon: faKey,
    },
  };

  const optionList = options.map((id) => signInMethods[id]);

  return (
    <BaseModal
      paperProps={{
        className: classes.paper,
      }}
      onClose={closeModal}
    >
      <ButtonBase className={classes.closeButton} onClick={closeModal}>
        <FontAwesomeIcon
          icon={faTimes}
          className={classes.icon}
        />
      </ButtonBase>
      <Typography className={classes.title}>
        {t('addBackupSignIn.title')}
      </Typography>
      <Typography className={classes.description}>
        {t('addBackupSignIn.description')}
      </Typography>
      {optionList.map((option) => (
        <div className={classnames(classes.optionWrapper, {
          [classes.accentWrapper]: selectedOption === option.id,
        })}
        >
          <ButtonBase
            key={option.id}
            className={classnames(classes.option, {
              [classes.unselected]: !(selectedOption === option.id),
            })}
            onClick={() => setSelectedOption(option.id)}
          >
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
            {option.text2 && (
              <Typography className={classes.optionSecondaryText}>
                {option.text2}
              </Typography>
            )}
          </ButtonBase>
        </div>
      ))}
      <div className={classes.buttonsContainer}>
        <Button
          className={classes.cancel}
          variant="secondary"
          onClick={closeModal}
        >
          {t('addBackupSignIn.cancel')}
        </Button>
        <Button
          className={classes.continue}
          variant="primary"
          disabled={!selectedOption}
          onClick={() => onClickContinue(selectedOption)}
        >
          {t('addBackupSignIn.continue')}
        </Button>
      </div>
    </BaseModal>
  );
};

AddBackUpSignIn.defaultProps = {
  options: [],
  onClickContinue: () => {},
};

AddBackUpSignIn.propTypes = {
  onClickContinue: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default AddBackUpSignIn;
