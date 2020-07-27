import React, { useRef } from 'react';
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

/* eslint-disable react/jsx-props-no-spreading */
const PermissionsDropdown = (props) => {
  const {
    open,
    options,
    onChange,
    className,
    handleClose,
    handleToggle,
    disableBorder,
    ...restProps
  } = props;

  const classes = useStyles();
  const anchorRef = useRef(null);

  const selectedOption = options.find((opt) => opt.selected);

  return (
    <>
      <ButtonBase
        ref={anchorRef}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classnames(
          classes.button,
          !disableBorder && classes.border,
          className,
        )}
        aria-controls={open ? 'menu-list-grow' : undefined}
        {...restProps}
      >
        <Typography variant="body2">
          {selectedOption.title}
        </Typography>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={classes.iconAngle}
        />
      </ButtonBase>
      <Popper
        transition
        open={open}
        role={undefined}
        anchorEl={anchorRef.current}
        className={classes.popper}
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
                      onClick={(e) => onChange(e, opt)}
                    >
                      <Typography
                        variant="body2"
                        display="inline"
                        className={classnames(
                          opt.danger && classes.danger,
                        )}
                      >
                        {opt.title}
                      </Typography>
                      {opt.selected && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={classes.iconCheck}
                        />
                      )}
                      {opt.description && (
                        <Typography
                          display="block"
                          variant="caption"
                          color="secondary"
                        >
                          {opt.description}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

PermissionsDropdown.defaultProps = {
  open: false,
  className: null,
  disableBorder: false,
};

PermissionsDropdown.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    danger: PropTypes.bool,
    selected: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default PermissionsDropdown;
