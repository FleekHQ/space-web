import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, Link as ReactRouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@ui/RainbowField';
import { checkIsEmail } from '@utils';

import { AUTH_ACTION_TYPES } from '@reducers/auth';

import useStyles from './styles';

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
        type: AUTH_ACTION_TYPES.ON_RESET,
      });
    };
  }, []);

  return (
    <>
      <Box
        mb="31px"
        display="inherit"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography>
          <Box component="span" fontSize="24px" fontWeight={600} color="common.white" fontFamily="Inter">
            {t(`modules.${currentView}.title`)}
          </Box>
        </Typography>
        <Link
          underline="none"
          component={ReactRouterLink}
          to={{
            pathname: currentView === 'signin' ? '/signup' : '/signin',
            search: location.search,
            state: formData,
          }}
        >
          <Box component="span" color="#006EFF" fontSize="14px" fontFamily="Inter">
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
            className={classes.emailField}
          />
          <Button
            fullWidth
            type="submit"
            loading={isLoading && email.length > 0}
            classes={{
              root: classes.btnRoot,
              disabled: classes.btnDisabled,
            }}
            disabled={isLoading || email.length === 0 || !checkIsEmail(email)}
          >
            {submitBtnText}
          </Button>
        </form>
      </Box>
    </>
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
