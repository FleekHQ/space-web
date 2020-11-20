import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@terminal-packages/space-ui/core/RainbowField';

import { backupKeysByPassphrase } from '@events';
import PasswordCheckTooltip from '@shared/components/PasswordCheckTooltip';
import changePasswordHelper from '@shared/components/Modal/ChangePassword/helper';

import useStyles from './styles';

const CreatePassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { userState, changePasswordState } = useSelector((s) => ({
    userState: s.user,
    changePasswordState: s.changePassword,
  }));
  const [state, setState] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    showPasswordTooltip: false,
  });

  const handleChangePassword = (event) => {
    event.preventDefault();

    backupKeysByPassphrase({
      uuid: userState.uuid,
      passphrase: state.confirmPassword,
    });
  };

  const handlePasswordTooltipVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showPasswordTooltip: !prevState.showPasswordTooltip,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  // eslint-disable-next-line react/prop-types
  const getEndAdornment = ({ showPasswordField }) => (
    <InputAdornment position="end" className={classes.adornment}>
      <IconButton
        className={classes.iconButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setState((prevState) => ({
            ...prevState,
            [showPasswordField]: !prevState[showPasswordField],
          }));
        }}
      >
        {!state[showPasswordField] ? (
          <FontAwesomeIcon
            icon={faEye}
            className={classes.icon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={classes.icon}
          />
        )}
      </IconButton>
    </InputAdornment>
  );

  React.useEffect(() => {
    if (changePasswordState.success) {
      history.push('/storage');
    }
  }, [changePasswordState.success]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mt={0} mb="10px" component="h1" fontSize="24px" color="common.white">
        {t('modules.createPassword.title')}
      </Box>
      <Box mb="15px" maxWidth={247} fontSize={12} color="common.white">
        {t('modules.createPassword.description')}
      </Box>
      <Box mb="14px" component="form" onSubmit={() => null}>
        <PasswordCheckTooltip
          bgColor="secondary"
          tooltipPlacement="bottom"
          password={state.password}
          open={state.showPasswordTooltip}
        >
          <Box
            isDark
            mb="23px"
            name="password"
            value={state.password}
            component={RainbowField}
            endAdornment={getEndAdornment({ showPasswordField: 'showPassword' })}
            label={t('common.password')}
            type={state.showPassword ? 'text' : 'password'}
            onChange={handleInputChange}
            onBlur={handlePasswordTooltipVisibility}
            onFocus={handlePasswordTooltipVisibility}
          />
        </PasswordCheckTooltip>
        <Box
          isDark
          mb="23px"
          component={RainbowField}
          name="confirmPassword"
          label={t('modules.createPassword.confirm')}
          variant="outlined"
          type={state.showConfirmPassword ? 'text' : 'password'}
          value={state.confirmPassword}
          endAdornment={getEndAdornment({ showPasswordField: 'showConfirmPassword' })}
          onChange={handleInputChange}
        />
        <Box mb="21px" color="common.white">
          <Box mr="5px" component="span" fontSize={12} color="inherit">
            <Trans
              i18nKey="modules.createPassword.remind"
              components={{
                tip: (
                  <Box component="span" color="#006EFF" fontSize={12} fontWeight={600} />
                ),
              }}
            />
          </Box>
          &#128514;&#129300;&#129299;
        </Box>
        <Box width="100%" color="common.white">
          <Button
            fullWidth
            classes={{
              disabled: classes.btnDisabled,
            }}
            disabled={
              !changePasswordHelper
                .verifyFormValidation(state.password, state.confirmPassword)
              || changePasswordState.loading
            }
            onClick={handleChangePassword}
          >
            {t('common.confirm')}
          </Button>
        </Box>
      </Box>
      <Box textAlign="center" color="common.white">
        <Link
          underline="hover"
          to="/auth/forgot-password"
          color="inherit"
          component={NavLink}
        >
          {t('common.goBack')}
        </Link>
      </Box>
    </Box>
  );
};

export default CreatePassword;
