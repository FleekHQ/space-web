import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

const EmailLinkAuth = ({ isSignup }) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const action = t(`modules.emailLinkAuth.${isSignup ? 'signup' : 'signin'}`);

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
            email: location.state && location.state.email ? location.state.email : '',
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
          components={[<Button className={classes.callToActionBtn} disableRipple />]}
        />
      </Typography>
      <Typography
        color="inherit"
        to={`/auth/${isSignup ? 'signup' : 'signin'}`}
        component={Link}
        variant="body2"
        className={classes.resetLinkStyle}
      >
        {t('modules.emailLinkAuth.back')}
      </Typography>
    </div>
  );
};

EmailLinkAuth.defaultProps = {
  isSignup: false,
};

EmailLinkAuth.propTypes = {
  isSignup: PropTypes.bool,
};

export default EmailLinkAuth;
