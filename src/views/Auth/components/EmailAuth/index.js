import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, Link as ReactRouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@terminal-packages/space-ui/core/RainbowField';

import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import useStyles from './styles';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmailAuth = ({
  onSubmit,
  isLoading,
  currentView,
  submitBtnText,
  defaultEmail,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState(null);
  const [email, setEmail] = React.useState(defaultEmail);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      email,
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    setEmail(value);
  };

  React.useEffect(() => {
    if (location.state && location.state.email) {
      setFormData(location.state);
    }

    return () => {
      dispatch({
        type: SIGNUP_ACTION_TYPES.ON_RESET,
      });
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    };
  }, []);

  return (
    <Box flex={1} maxWidth={247} display="inherit" flexDirection="column">
      <Box
        mb="31px"
        display="inherit"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography>
          <Box component="span" fontSize="24px" fontWeight={600} color="common.white">
            {t(`modules.${currentView}.title`)}
          </Box>
        </Typography>
        <Link
          underline="none"
          component={ReactRouterLink}
          to={{
            pathname: currentView === 'signin' ? '/signup' : '/signin',
            state: formData,
          }}
        >
          <Box component="span" color="#006EFF" fontSize="14px">
            {t(`modules.${currentView === 'signin' ? 'signup' : 'signin'}.title`)}
          </Box>
        </Link>
      </Box>
      <Box mb="20px" width="100%">
        <form onSubmit={handleSubmit}>
          <Box
            isDark
            mb="23px"
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            component={RainbowField}
            label={t('common.email')}
            onChange={handleInputChange}
          />
          <Button
            fullWidth
            type="submit"
            loading={isLoading && email.length > 0}
            classes={{
              disabled: classes.btnDisabled,
            }}
            disabled={isLoading || email.length === 0 || !EMAIL_REGEX.test(email)}
          >
            {submitBtnText}
          </Button>
        </form>
      </Box>
      {
        currentView === 'signup' && (
          <Box maxWidth={192} color="#888888" textAlign="center" alignSelf="center">
            <Typography color="inherit">
              <Box component="span" fontSize="12px">
                {`${t('modules.signup.agreenment.part1')} `}
                <ButtonBase
                  component="a"
                  color="inherit"
                  className={classes.linkButton}
                  onClick={() => null}
                >
                  {`${t('modules.signup.agreenment.privacy')}`}
                </ButtonBase>
                &nbsp;&&nbsp;
                <ButtonBase
                  component="a"
                  color="inherit"
                  className={classes.linkButton}
                  onClick={() => null}
                >
                  {t('modules.signup.agreenment.terms')}
                </ButtonBase>
              </Box>
            </Typography>
          </Box>
        )
      }
    </Box>
  );
};

EmailAuth.defaultProps = {
  isLoading: false,
  defaultEmail: '',
};

EmailAuth.propTypes = {
  isLoading: PropTypes.bool,
  defaultEmail: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  submitBtnText: PropTypes.string.isRequired,
};

export default EmailAuth;
