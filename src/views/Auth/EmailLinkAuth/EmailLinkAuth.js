import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import { useAuth0Passwordless } from '@utils';

import useStyles from './styles';

const EmailLinkAuth = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const { sendPasswordlessEmail } = useAuth0Passwordless();

  const from = (location.state && location.state.from) || 'signin';
  const action = t(`modules.emailLinkAuth.${from}`);

  const handleOnResendEmail = async () => {
    const { redirect_to: redirectTo } = queryString.parse(location.search);

    await sendPasswordlessEmail({
      from,
      email: location.state && location.state.email ? location.state.email : '',
      redirectTo,
    });
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const resendEmail = urlParams.get('resend');

    if (location.state && location.state.email) {
      setEmail(location.state.email);
      return;
    }

    if (resendEmail) {
      setEmail(resendEmail);
      const resendMagicLink = async () => {
        try {
          await sendPasswordlessEmail({
            from,
            email: resendEmail,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error when trying to resend the magic link email: ${error.message}`);
        }
      };

      resendMagicLink();
    }
  }, []);

  return (
    <div className={classes.root}>
      <img src={`${process.env.PUBLIC_URL}/assets/images/magic_wand.svg`} alt="" width="42" />
      <Typography className={classes.title} color="inherit">
        {t('modules.emailLinkAuth.title', { action })}
      </Typography>
      <Typography color="inherit" className={classes.message}>
        <Trans
          i18nKey="modules.emailLinkAuth.message"
          components={[<Box fontWeight={600} component="span" />]}
          values={{
            action,
            email,
          }}
        />
      </Typography>
      <Typography
        color="inherit"
        className={classes.callToAction}
        variant="body2"
      >
        <Trans
          i18nKey="modules.emailLinkAuth.callToAction"
          components={[
            <Button
              disableRipple
              className={classes.callToActionBtn}
              onClick={handleOnResendEmail}
            />,
          ]}
        />
      </Typography>
      <Typography
        color="inherit"
        to={{
          pathname: `/${from}`,
          search: location.search,
        }}
        component={Link}
        variant="body2"
        className={classes.resetLinkStyle}
      >
        {t('modules.emailLinkAuth.back')}
      </Typography>
    </div>
  );
};

export default EmailLinkAuth;
