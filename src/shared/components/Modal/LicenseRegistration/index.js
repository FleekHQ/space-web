import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';

import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';

import useStyles from './styles';

const LicenseRegistration = ({
  closeModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    error: null,
    success: false,
    loading: false,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    setState({
      ...state,
      loading: true,
    });

    setTimeout(() => {
      setState({
        ...state,
        success: true,
        loading: false,
      });
    }, 2000);
  };

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb="11px">
          {
            state.success ? <FontAwesomeIcon className={classes.icon} icon={faCheckCircle} /> : (
              <img width={63} src={`${process.env.PUBLIC_URL}/icon.png`} alt="space app logo" />
            )
          }
        </Box>
        <Box mb="6px" textAlign="center">
          <Typography>
            <Box
              fontSize={18}
              component="span"
              fontWeight={500}
            >
              {t('modals.license.title')}
            </Box>
          </Typography>
        </Box>
        <Box textAlign="center" mb="20px" color="palette.gray1">
          <Typography color="inherit" variant="body2">
            {
              state.success ? t('modals.license.upgradedDescription') : t('modals.license.description')
            }
          </Typography>
          {
            !state.success && (
              <Typography color="inherit" variant="body2">
                {t('modals.license.description1')}
              </Typography>
            )
          }
        </Box>
        {
          !state.success && (
            <Box width="100%" component="form" onSubmit={handleOnSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                className={classes.textField}
                placeholder={t('modals.license.placeholder')}
              />
              {
                state.error && (
                  <Typography variant="body2" color="secondary" className={classes.errorMessage}>
                    {state.error}
                  </Typography>
                )
              }
              <Box mt="20px" display="flex" justifyContent="space-between" color="primary.main">
                <Button
                  color="inherit"
                  variant="outlined"
                  disabled={state.loading}
                  // TODO: change to real space billing url
                  onClick={() => {
                    window
                      .open('/https://space.storage', '_blank')
                      .focus();
                  }}
                >
                  {t('modals.license.buy')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={state.loading}
                  classes={{
                    root: classes.btn,
                  }}
                >
                  {
                    state.loading ? (
                      <FontAwesomeIcon spin icon={faSpinner} />
                    ) : t('modals.license.register')
                  }
                </Button>
              </Box>
            </Box>
          )
        }
      </Box>
    </BaseModal>
  );
};

LicenseRegistration.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LicenseRegistration;
