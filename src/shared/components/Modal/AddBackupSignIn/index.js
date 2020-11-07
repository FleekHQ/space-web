import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
  error,
  loading,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  const MAX_ITEMS = 4;
  const OPTION_HEIGHT = 64;
  const listMaxHeight = OPTION_HEIGHT * MAX_ITEMS;
  const listHeight = Math.min((options.length * OPTION_HEIGHT), listMaxHeight);

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
      <Scrollbars
        thumbSize={68}
        style={{ width: '100%', height: listHeight }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            style={{
              ...style,
              backgroundColor: '#AEAEAE',
              width: 4,
              borderRadius: 3,
              right: 0,
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div
            style={{
              ...style,
              height: '100%',
              top: 0,
              right: 7,
              width: 4,
              border: options.length > MAX_ITEMS ? '1px solid #e2e2e2' : 'none',
              borderRadius: 3,
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
      >
        {optionList.map((option) => (
          <div
            key={option.id}
            className={classnames({
              [classes.accentWrapper]: selectedOption === option.id,
              [classes.optionWrapper]: selectedOption !== option.id,
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
                  <div className={classes.optionIconContainer}>
                    <img
                      alt={option.id}
                      src={option.imgSrc}
                      className={classnames(classes.image, classes[option.id])}
                    />
                  </div>
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
      </Scrollbars>
      {error && (
        <Typography className={classes.error}>{error}</Typography>
      )}
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
          loading={loading}
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
  error: '',
  loading: false,
};

AddBackUpSignIn.propTypes = {
  onClickContinue: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default AddBackUpSignIn;
