import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { faLockAlt } from '@fortawesome/pro-solid-svg-icons/faLockAlt';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';

import FileIcon from '@ui/FileIcon';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { openPublicFile } from '@events';

import useStyles from './styles';

const FileLinkPassword = ({
  hash,
  fname,
  history,
  closeModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [password, setPassword] = React.useState('');
  const { openPublicFileState } = useSelector((s) => ({
    openPublicFileState: s.openPublicFile,
  }));

  React.useEffect(() => {
    if (openPublicFileState.location) {
      closeModal();
      // remove fname and hash from qs
      history.replace('/storage/shared-by');
    }
  }, [openPublicFileState.location]);

  const [fName, fExt] = fname.split('.');

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <Box width="100%" display="flex" justifyContent="flex-end" pt="18px" pr="18px">
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.closeIcon}
          />
        </ButtonBase>
      </Box>
      <Box maxWidth="100%" pl={5} pr={5} mb="19px" display="flex" alignItems="center">
        <Box display="flex" width={18} height={18} mr={1}>
          <FileIcon ext={fExt} />
        </Box>
        <Typography noWrap>
          <Box component="span" fontWeight={500} fontSize="14px">
            {fName}
          </Box>
        </Typography>
        <Typography>
          <Box component="span" fontWeight={500} fontSize="14px">
            {fExt}
          </Box>
        </Typography>
      </Box>
      <Box mb={1} className={classes.lockIconContainre}>
        <svg width="0" height="0">
          <linearGradient id="lgrad" x1="50%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#ED55EB" />
            <stop offset="37%" stopColor="#17E0D8" />
            <stop offset="60%" stopColor="#00FFC2" />
            <stop offset="100%" stopColor="#FFEC06" />
          </linearGradient>
        </svg>
        <FontAwesomeIcon
          icon={faLockAlt}
          className={classes.lockIcon}
        />
      </Box>
      <Box mb="3px">
        <Typography>
          <Box component="span" fontWeight={600} fontSize="16px">
            {t('modals.fileLinkPassword.description')}
          </Box>
        </Typography>
      </Box>
      <Box mb="20px">
        <Typography>
          <Box component="span" fontSize="14px">
            {t('modals.fileLinkPassword.openText')}
          </Box>
        </Typography>
      </Box>
      <Box mb="18px" width="100%" px="18px">
        <form
          id="password-form"
          onSubmit={(event) => {
            event.preventDefault();

            openPublicFile({
              password,
              fileCid: hash,
              filename: fname,
              reloadFiles: true,
            });
          }}
        >
          <TextField
            fullWidth
            error={!!openPublicFileState.error}
            type="password"
            value={password}
            variant="outlined"
            label={t('common.password')}
            helperText={(
              <>
                {
                  openPublicFileState.error && (
                    <Box component="span" mr="5px" mx="-14px" display="flex" alignItems="center" color="error.main">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className={classes.errorIcon}
                      />
                      <Box component="span" ml="3px" color="inherit" fontSize="12px">
                        Incorrect password, please try again.
                      </Box>
                    </Box>
                  )
                }
              </>
            )}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </Box>
      <Box
        mb="15px"
        px="18px"
        width="100%"
        display="flex"
        justifyContent="flex-end"
      >
        <Box mr={1}>
          <Button
            onClick={closeModal}
            color="secondary"
            variant="outlined"
            disabled={openPublicFileState.loading}
          >
            {t('common.cancel')}
          </Button>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          form="password-form"
          classes={{ root: classes.btnRoot }}
          disabled={password.length === 0 || openPublicFileState.loading}
        >
          {
            openPublicFileState.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} />
            ) : t('common.open')
          }
        </Button>
      </Box>
    </BaseModal>
  );
};

FileLinkPassword.propTypes = {
  hash: PropTypes.string.isRequired,
  fname: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default FileLinkPassword;
