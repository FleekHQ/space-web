import React from 'react';
import Avatar from '@ui/Avatar';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './styles';
import {
  Body,
  Header,
  Section,
  BaseCard,
} from '../../components';

const Account = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              {t('modals.settings.account.profilePicture')}
            </Typography>
          </Section>
          <Section>
            <Avatar size={32} username="Test" />
            <ButtonBase>
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
              Jason Kerro
            </Typography>
            <ButtonBase>
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
            <ButtonBase>
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
              0xd606f05a2a980f58737aa913553c8d6eac8b
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
