/* eslint-disable no-unused-vars, max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';
import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil';
import { faUpload } from '@fortawesome/pro-regular-svg-icons/faUpload';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Radio from '@material-ui/core/Radio';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@terminal-packages/space-ui/core/Button';
import Avatar from '@terminal-packages/space-ui/core/Avatar';

import BaseModal from '@ui/BaseModal';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';
import { fileToBase64 } from '@utils';
import { USER_ACTION_TYPES } from '@reducers/user';
import { updateIdentity, uploadProfilePic } from '@events';

import useStyles from './styles';

const PROFILE_PIC_OPTIONS = [
  {
    key: 'upload',
    icon: faUpload,
  },
  {
    key: 'trash',
    icon: faTrash,
    disabled: true,
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

const FORM_ID = 'display-name-form';

const EditProfile = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const picInputRef = React.useRef(null);
  const user = useSelector((s) => s.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [radioValue, setRadioValue] = React.useState('');
  const [value, setValue] = React.useState(user.displayName);

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
    picInputRef.current.value = '';
  };

  const onChange = (event) => {
    if (event.target.value && event.target.value.length > 50) {
      setValue(event.target.value.slice(0, 50));
      return;
    }

    setValue(event.target.value);
  };

  const handlePicChange = async (event) => {
    const file = await fileToBase64(event.target.files[0]);
    if (file) {
      setAnchorEl(null);
      picInputRef.current.value = '';
      uploadProfilePic({ file });
    }
  };

  const handlePicOptionClick = (key) => (event) => {
    event.preventDefault();

    if (key === 'upload') {
      picInputRef.current.click();
      return;
    }
    // eslint-disable-next-line no-console
    console.log('TODO: remove pic!');
  };

  const handleOnSubmitForm = (e) => {
    e.preventDefault();

    updateIdentity({
      displayName: value,
    });
  };

  React.useEffect(() => {
    if (user.updatingUserSuccess) {
      closeModal();
      dispatch({
        type: USER_ACTION_TYPES.ON_UPDATING_USER_RESET,
      });
    }
  }, [user.updatingUserSuccess]);

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
          <input
            type="file"
            name="image"
            ref={picInputRef}
            onChange={handlePicChange}
            className={classes.input}
            accept="image/x-png,image/jpeg"
          />
          <Avatar
            size={86}
            imgUrl={user.avatarUrl}
            isLoading={user.uploadingAvatar}
          />
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
                disabled={user.uploadingAvatar}
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
                        <ListItem
                          button
                          disableGutters
                          key={o.key}
                          className={classes.picOption}
                          onClick={handlePicOptionClick(o.key)}
                          disabled={o.disabled}
                        >
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
        id={FORM_ID}
        onSubmit={handleOnSubmitForm}
      >
        <TextField
          fullWidth
          label={t('modals.editProfile.displayName')}
          value={value}
          onChange={onChange}
          error={!!user.updatingUserError}
          className={classes.textField}
        />
        {user.updatingUserError && (
          <Typography variant="body2" className={classes.errorMessage}>
            {user.updatingUserError}
          </Typography>
        )}
      </Box>
      {/* <Box mt="20px">
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
      </Box> */}
      <div className={classes.buttonContainer}>
        <Button
          onClick={closeModal}
          color="secondary"
          variant="outlined"
          classes={{
            root: classes.btnCancel,
          }}
          disabled={user.updatingUser}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          form={FORM_ID}
          loading={user.updatingUser}
          disabled={user.updatingUser}
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
};

export default EditProfile;
