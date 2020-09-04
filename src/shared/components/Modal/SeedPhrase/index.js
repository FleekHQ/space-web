import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  const [confirmed, setConfirm] = React.useState(false);

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
      <Typography align="center" variant="h6">
        <Box component="span" fontWeight={600}>
          {t('modals.settings.security.seedPhraseModal.title')}
        </Box>
      </Typography>
      <br />
      <Typography align="center" variant="body2">
        {t('modals.settings.security.seedPhraseModal.description')}
      </Typography>
      <br />
      <TextField
        multiline
        fullWidth
        variant="outlined"
        rows={3}
        value={state.seedphrase || ''}
        InputProps={{
          readOnly: true,
          classes: {
            root: classes.textAreaRoot,
          },
        }}
      />
      <br />
      <FormControlLabel
        label={t('modals.settings.security.seedPhraseModal.confirmation')}
        classes={{
          root: classes.formControlLabelRoot,
        }}
        control={(
          <Checkbox
            disableRipple
            color="primary"
            checked={confirmed}
            classes={{
              root: classes.checkboxRoot,
              colorPrimary: classes.checkboxColorPrimary,
            }}
            onChange={(event) => setConfirm(event.target.checked)}
          />
        )}
      />
      <br />
      <Button
        variant="contained"
        onClick={() => closeModal()}
        disabled={!confirmed || state.loading}
      >
        {
          state.loading ? (
            <FontAwesomeIcon spin icon={faSpinner} />
          ) : t('common.done')
        }
      </Button>
    </BaseModal>
  );
};

SeedPhraseModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SeedPhraseModal;
