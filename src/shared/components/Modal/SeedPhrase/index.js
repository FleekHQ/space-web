import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import BaseModal from '@ui/BaseModal';
import { getMnemonic } from '@events';
import { MNEMONIC_ACTION_TYPES } from '@reducers/mnemonic';

import useStyles from './styles';

const SeedPhraseModal = ({
  t,
  closeModal,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((s) => s.mnemonic);

  React.useEffect(() => {
    getMnemonic();

    return () => {
      dispatch({
        type: MNEMONIC_ACTION_TYPES.ON_RESTART,
      });
    };
  }, []);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.paper,
      }}
      modalProps={{
        open: true,
      }}
    >
      <ButtonBase onClick={closeModal} className={classes.closeButton}>
        <FontAwesomeIcon
          icon={faTimes}
          className={classes.closeIcon}
        />
      </ButtonBase>
      <Typography className={classes.title}>
        <Box component="span" fontWeight={600}>
          {t('modals.settings.security.seedPhraseModal.title')}
        </Box>
      </Typography>
      <Typography className={classes.description}>
        {t('modals.settings.security.seedPhraseModal.description')}
      </Typography>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={state.seedphrase || ''}
        InputProps={{
          readOnly: true,
          classes: {
            root: classes.textAreaRoot,
          },
        }}
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => closeModal()}
          disabled={state.loading}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} />
            ) : t('common.done')
          }
        </Button>
      </div>
    </BaseModal>
  );
};

SeedPhraseModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SeedPhraseModal;
