import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import classnames from 'classnames';

import useStyles from './styles';

const PermissionsDropdown = (props) => {
  const {
    options,
    onChange,
    defaultOpen,
    disableBorder,
    defaultOption,
  } = props;

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(defaultOpen);
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOption);

  const classes = useStyles();

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  const selectedOption = options.find((opt) => opt.id === selectedOptionId);

  return (
    <div>
      <ButtonBase
        ref={anchorRef}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classnames(
          classes.button,
          !disableBorder && classes.border,
        )}
        aria-controls={open ? 'menu-list-grow' : undefined}
      >
        {selectedOption.title}
        <FontAwesomeIcon
          icon={faAngleDown}
          className={classes.iconAngle}
        />
      </ButtonBase>
      <Popper
        transition
        disablePortal
        open={open}
        role={undefined}
        anchorEl={anchorRef.current}
      >
        {({ TransitionProps, placement }) => (
          /* eslint-disable react/jsx-props-no-spreading */
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="menu-list-grow"
                  autoFocusItem={open}
                >
                  {options.map((opt) => (
                    <MenuItem
                      key={opt.id}
                      className={classes.menuItem}
                      onClick={() => {
                        onChange(opt);
                        setSelectedOptionId(opt.id);
                        handleClose();
                      }}
                    >
                      <Typography
                        variant="body2"
                        display="inline"
                      >
                        {opt.title}
                      </Typography>
                      {opt.id === selectedOptionId && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={classes.iconCheck}
                        />
                      )}
                      <Typography
                        display="block"
                        variant="caption"
                        color="secondary"
                      >
                        {opt.description}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

PermissionsDropdown.defaultProps = {
  defaultOpen: false,
  disableBorder: false,
};

PermissionsDropdown.propTypes = {
  defaultOpen: PropTypes.bool,
  disableBorder: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default PermissionsDropdown;
