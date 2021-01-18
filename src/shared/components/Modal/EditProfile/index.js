import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil';
import { faUpload } from '@fortawesome/pro-regular-svg-icons/faUpload';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';

import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Radio from '@material-ui/core/Radio';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@terminal-packages/space-ui/core/Button';
import Avatar from '@terminal-packages/space-ui/core/Avatar';

import BaseModal from '@ui/BaseModal';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';

import useStyles from './styles';

const PROFILE_PIC_OPTIONS = [
  {
    key: 'upload',
    icon: faUpload,
  },
  {
    key: 'trash',
    icon: faTrash,
  },
];
const PROFILE_RADIO_OPTIONS = [
  {
    key: 'public',
  },
  {
    key: 'private',
  },
];

const EditProfile = ({
  user,
  closeModal,
}) => {
  const { t } = useTranslation();
  const [error] = React.useState();
  const [loading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [radioValue, setRadioValue] = React.useState('');
  const [value, setValue] = React.useState(user.displayName);

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">
          <Box component="span" fontWeight={600}>
            {t('modals.editProfile.title')}
          </Box>
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.icon}
          />
        </ButtonBase>
      </Box>
      <Box
        mt={2}
        mb={1}
        display="flex"
        position="relative"
        justifyContent="center"
      >
        <Box position="relative">
          <Avatar size={86} imgUrl={user.avatarUrl} />
          <Box
            bottom="10px"
            right="-25px"
            position="absolute"
          >
            <Box position="relative">
              <ButtonBase
                disableRipple
                disableFocusRipple
                color="inherit"
                aria-describedby={id}
                className={classes.editBtn}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <span>
                  <FontAwesomeIcon icon={faPencil} />
                </span>
                <Box ml="5px" component="span">
                  {t('common.edit')}
                </Box>
              </ButtonBase>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{
                  root: classes.rootPopover,
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Box width={165} display="flex" flexDirection="column" pt="11px" pb="8px">
                  <List disablePadding>
                    {
                      PROFILE_PIC_OPTIONS.map((o) => (
                        <ListItem key={o.key} button disableGutters className={classes.picOption}>
                          <Box minWidth={14}>
                            <FontAwesomeIcon icon={o.icon} />
                          </Box>
                          <Box ml="10px">
                            {t(`modals.editProfile.picOptions.${o.key}`)}
                          </Box>
                        </ListItem>
                      ))
                    }
                  </List>
                </Box>
              </Popover>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={onSubmitForm}
      >
        <TextField
          fullWidth
          label={t('modals.editProfile.displayName')}
          value={value}
          onChange={onChange}
          error={!!error}
          className={classes.textField}
        />
        {error && (
          <Typography variant="body2" className={classes.errorMessage}>
            {error}
          </Typography>
        )}
      </Box>
      <Box mt="20px">
        <Typography>
          <Box component="span" fontWeight={500}>
            {t('modals.editProfile.radio.title')}
          </Box>
        </Typography>
        <Box mt={1}>
          <FormControl fullWidth component="fieldset">
            <RadioGroup aria-label="accountInfo" name="accountInfo" value={radioValue} onChange={(event) => setRadioValue(event.target.value)}>
              {
                PROFILE_RADIO_OPTIONS.map((o, i) => (
                  <>
                    <FormControlLabel
                      key={o.key}
                      value={o.key}
                      label={t(`modals.editProfile.radio.${o.key}`)}
                      classes={{
                        label: classes.radioLabel,
                      }}
                      control={<Radio classes={{ root: classes.radioRoot, checked: classes.radioChecked }} size="small" />}
                    />
                    {
                      i === 0 && <Box my="2px" />
                    }
                  </>
                ))
              }
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <div className={classes.buttonContainer}>
        <Button
          onClick={closeModal}
          color="secondary"
          variant="outlined"
          disabled={loading}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          classes={{
            root: classes.btnRoot,
          }}
        >
          {t('common.save')}
        </Button>
      </div>
    </BaseModal>
  );
};

EditProfile.defaultProps = {
  closeModal: () => {},
};

EditProfile.propTypes = {
  closeModal: PropTypes.func,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default EditProfile;
