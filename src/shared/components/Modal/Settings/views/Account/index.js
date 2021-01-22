import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import { OPTION_IDS } from '@shared/components/Modal/AddBackupSignIn/constants';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@terminal-packages/space-ui/core/Button';
import AddBackUpSignIn from '@shared/components/Modal/AddBackupSignIn';
import classnames from 'classnames';
import config from '@config';
import MessageBox from '@ui/MessageBox';
import { faShieldAlt } from '@fortawesome/pro-regular-svg-icons/faShieldAlt';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { addLinkedAddress } from '@events';
import { useTorusSdk } from '@utils';
import { LINKED_ADDRESSES_ACTION_TYPES } from '@reducers/linked-addresses';

import useStyles from './styles';
import SeedPhraseModal from '../../../SeedPhrase';
import ChangePasswordModal from '../../../ChangePassword';
import CreateUsernamePassword from '../../../CreateUsernamePassword';

import {
  Body,
  Header,
  // Section,
  BaseCard,
} from '../../components';

const ADD_BACKUP_SIGN_IN = 'addBackUpSignIn';

const Account = ({ t }) => {
  const [state, setState] = React.useState({
    [OPTION_IDS.EMAIL]: false,
    [OPTION_IDS.USERNAME]: false,
    [OPTION_IDS.GOOGLE]: false,
    [OPTION_IDS.TWITTER]: false,
    [OPTION_IDS.SEED_PHRASE]: false,
    [ADD_BACKUP_SIGN_IN]: false,
    createUsernamePassword: false,
  });

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const { torusTriggerLogin } = useTorusSdk({
    ...config.torus.sdkConfig,
    redirectToOpener: true,
  });
  const [user, linkedAddresses] = useSelector((reduxState) => [
    reduxState.user,
    reduxState.linkedAddresses,
  ]);

  const handleOpenModal = (event) => {
    event.preventDefault();

    setError(false);
    const targetId = event.currentTarget.id;
    if (targetId === ADD_BACKUP_SIGN_IN) {
      dispatch({
        type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_RESET,
      });
    }

    setState((prevState) => ({
      ...prevState,
      [targetId]: true,
    }));
  };

  const addLinkedAddressTorus = async (provider) => {
    dispatch({
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS,
    });

    const tRes = await torusTriggerLogin({ provider });

    if (tRes) {
      dispatch(addLinkedAddress({
        torusRes: tRes,
        provider,
        uuid: user.uuid,
      }));
    } else {
      dispatch({
        type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_ERROR,
        error: t('addBackupSignIn.torusError'),
      });
    }
  };

  useEffect(() => {
    if (linkedAddresses.addLinkedAddress.success) {
      setState((prevState) => ({
        ...prevState,
        [OPTION_IDS.GOOGLE]: false,
        [OPTION_IDS.TWITTER]: false,
        addBackUpSignIn: false,
      }));
    }
  }, [linkedAddresses.addLinkedAddress.success]);

  const onClickNewMethod = (methodId) => {
    switch (methodId) {
      case OPTION_IDS.USERNAME: {
        setState((prevState) => ({
          ...prevState,
          addBackUpSignIn: false,
          createUsernamePassword: true,
        }));
        break;
      }
      case OPTION_IDS.TWITTER:
      case OPTION_IDS.GOOGLE: {
        addLinkedAddressTorus(methodId.toLowerCase());
        break;
      }
      default: {
        setState((prevState) => ({ ...prevState, addBackUpSignIn: false }));
        break;
      }
    }
    setError(false);
  };

  const options = {};

  linkedAddresses.data.forEach((linkedAddress) => {
    const { provider } = linkedAddress;
    const metadata = linkedAddress.metadata || {};

    switch (provider) {
      case 'google':
        options[OPTION_IDS.GOOGLE] = {
          id: OPTION_IDS.GOOGLE,
          text: t('addBackupSignIn.google'),
          text2: metadata.email,
          // Uncomment text below to re-enable the red disconnect button
          // text3: t('modals.settings.account.disconnect'),
          imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Google__G__Logo.svg',
          redText3: true,
        };
        break;
      case 'twitter':
        options[OPTION_IDS.TWITTER] = {
          id: OPTION_IDS.TWITTER,
          text: t('addBackupSignIn.twitter'),
          text2: metadata.nickname ? `@${metadata.nickname}` : metadata.name,
          // text3: t('modals.settings.account.disconnect'),
          imgSrc: 'https://fleek-team-bucket.storage.fleek.co/third-party-logo/Twitter_Logo_Blue.svg',
          redText3: true,
        };
        break;
      case 'passwordless':
        options[OPTION_IDS.EMAIL] = {
          id: OPTION_IDS.EMAIL,
          text: t('addBackupSignIn.email'),
          text2: metadata.email,
          // text3: t('modals.settings.account.disconnect'),
          icon: faEnvelope,
        };
        break;
      default:
        break;
    }
  });

  const modalOptions = Object.keys(OPTION_IDS).filter((optionId) => {
    const isOptionNotAdded = !options[optionId];
    const isEmail = optionId === OPTION_IDS.EMAIL;
    return (isOptionNotAdded && !isEmail);
  });

  return (
    <>
      <BaseCard>
        <Header>
          <Box mt="30px" mb={2} display="flex" flexDirection="column">
            <Typography>
              <Box component="span" fontSize={16} fontWeight={500}>
                {t('modals.settings.account.subtitle')}
              </Box>
            </Typography>
            <Box mt="9px">
              <Typography>
                <Box compoonent="span" fontSize={12} color="#7E7E7E">
                  {t('modals.settings.account.description')}
                </Box>
              </Typography>
            </Box>
          </Box>
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
                  <Typography className={classes.optionText2}>{option.text2}</Typography>
                  <div className={classes.optionText3Wrapper}>
                    <ButtonBase>
                      <Typography
                        onClick={handleOpenModal}
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
              </div>
            );
          })}
          <Divider className={classes.divider} />
        </Body>
        <Box m="0 20px 25px 20px">
          <Button
            fullWidth
            id={ADD_BACKUP_SIGN_IN}
            className={classes.addItemBtn}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleOpenModal}
          >
            {t('modals.settings.account.warning.button')}
          </Button>
        </Box>
        {
          (Object.keys(options).length < 2) && (
            <div className={classes.messageBox}>
              <MessageBox
                isRainbow
                icon={faShieldAlt}
                iconColor={theme.palette.palette.green5}
                title={t('modals.settings.account.warning.title')}
              >
                <Typography className={classes.warningDescription}>
                  {t('modals.settings.account.warning.description')}
                </Typography>
                <Button
                  id={ADD_BACKUP_SIGN_IN}
                  variant="primary"
                  onClick={handleOpenModal}
                >
                  {t('modals.settings.account.warning.button')}
                </Button>
              </MessageBox>
            </div>
          )
        }
      </BaseCard>
      {error && (
        <BaseCard className={classes.errorContainer}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className={classes.errorIcon}
          />
          <Typography className={classes.errorText}>
            {t('modals.settings.account.addNewError')}
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
            loading={linkedAddresses.addLinkedAddress.loading}
            error={linkedAddresses.addLinkedAddress.error}
            options={modalOptions}
            onClickContinue={onClickNewMethod}
            closeModal={() => (
              setState((prevState) => ({ ...prevState, addBackUpSignIn: false }))
            )}
          />
        )
      }
      {
        state.createUsernamePassword && (
          <CreateUsernamePassword
            setError={setError}
            closeModal={() => (
              setState((prevState) => ({ ...prevState, createUsernamePassword: false }))
            )}
          />
        )
      }
    </>
  );
};

Account.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Account;
