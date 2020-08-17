import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BaseModal from '@ui/BaseModal';

import useStyles from './styles';

const SeedPhraseModal = ({
  t,
  onDone,
}) => {
  const classes = useStyles();
  const [confirmed, setConfirm] = React.useState(false);

  return (
    <BaseModal
      paperProps={{
        className: classes.paper,
      }}
      modalProps={{
        open: true,
      }}
    >
      <Typography align="center" variant="h6">
        <Box fontWeight={600}>
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
        rows={4}
        variant="outlined"
        value="bear golf art sick donut apple cat
        fog dog orange pear vanilla cake
        bear golf art sick donut apple cat
        fog dog orange pear vanilla cake"
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
        disabled={!confirmed}
        onClick={onDone}
      >
        {t('common.done')}
      </Button>
    </BaseModal>
  );
};

SeedPhraseModal.propTypes = {
  t: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default SeedPhraseModal;
