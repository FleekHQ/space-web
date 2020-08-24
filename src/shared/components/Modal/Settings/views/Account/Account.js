/* eslint-disable */
import React from 'react';
import Avatar from '@ui/Avatar';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';

import getHandlers from './get-handlers';
import useStyles from './styles';
import {
  Body,
  Header,
  Section,
  BaseCard,
} from '../../components';

const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = React.useRef(null);

  const {
    address,
    username,
    displayName = '',
  } = useSelector((state) => state.user);

  const {
    onChangeImage,
    onChangeUsername,
    onSetDisplayName,
  } = getHandlers(t, dispatch, 'SOME_TOKEN');

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
            <Avatar size={32} username="Test" />
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
                {t('modals.settings.account.setUsername')}
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
              >
                {t('modals.settings.account.deleteAccount')}
              </Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>
    </div>
  );
};

export default Account;
