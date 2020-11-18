import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Avatar from '@ui/Avatar';
import ErrorCard from '@ui/ErrorCard';

import getHandlers from './get-handlers';
import useStyles from './styles';
import {
  Body,
  Header,
  Section,
  BaseCard,
} from '../../components';

/* eslint-disable react/jsx-props-no-spreading */
const Account = ({
  closeMainModal,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = React.useRef(null);

  const { user, account } = useSelector((state) => ({
    user: state.user,
    account: state.settings.account,
  }));

  const {
    address,
    username,
    avatarUrl,
    uploadingAvatar,
    displayName = '',
  } = user;

  const {
    onChangeImage,
    onDeleteAccount,
    onChangeUsername,
    onSetDisplayName,
  } = getHandlers({
    t,
    username,
    dispatch,
    closeMainModal,
  });

  return (
    <div className={classes.root}>
      <input
        ref={ref}
        type="file"
        name="image"
        onChange={onChangeImage}
        className={classes.input}
        accept="image/x-png,image/jpeg"
      />
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              {t('modals.settings.account.profilePicture')}
            </Typography>
          </Section>
          <Section>
            <Avatar
              size={32}
              username={username}
              isLoading={uploadingAvatar}
              {...(avatarUrl && avatarUrl !== '' && { imgUrl: avatarUrl })}
            />
            <ButtonBase onClick={() => ref.current.click()}>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {t('modals.settings.account.edit')}
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              {t('modals.settings.account.displayName')}
            </Typography>
          </Section>
          <Section>
            <Typography variant="body2">
              {displayName}
            </Typography>
            <ButtonBase onClick={onSetDisplayName}>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {t('modals.settings.account.setDisplayName')}
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              {t('modals.settings.account.username')}
            </Typography>
          </Section>
          <Section>
            <Typography variant="body2">
              {username}
            </Typography>
            <ButtonBase onClick={onChangeUsername}>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {
                  username && username.length > 0 ? t('modals.settings.account.changeUsername') : t('modals.settings.account.setUsername')
                }
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
        <Body>
          <div className={classes.profileContainer}>
            <Typography variant="body2" color="secondary">
              {t('modals.settings.account.profileId')}
            </Typography>
            <Typography variant="body2" color="secondary">
              {address}
            </Typography>
          </div>
        </Body>
      </BaseCard>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              {t('modals.settings.account.dangerZone')}
            </Typography>
          </Section>
          <Section>
            <ButtonBase>
              <Typography
                variant="body2"
                color="error"
                onClick={onDeleteAccount}
              >
                {t('modals.settings.account.deleteAccount')}
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>
      {
        account.error && (
          <ErrorCard message={account.error} />
        )
      }
    </div>
  );
};

Account.propTypes = {
  closeMainModal: PropTypes.func.isRequired,
};

export default Account;
