/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateNewMenu from '../../index';
import useStyles from './styles';

const Option = ({
  id,
  icon,
  img,
  label,
  subItems,
  onClick,
  closeParent,
  selectedItem,
  setSelectedItem,
  placement,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  const [anchorEl, setAnchorEl] = useState(null);
  const hasSubItems = subItems.length > 0;
  const isSelected = selectedItem === id;

  const onMouseEnter = (e) => {
    if (hasSubItems) {
      setAnchorEl(anchorEl || e.currentTarget);
    }
    setSelectedItem(id);
  };

  const itemAction = (e) => {
    if (!hasSubItems) {
      onClick(e);
      closeParent();
    }
  };

  const getIcon = () => {
    if (icon) {
      return (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={icon}
          />
        </div>
      );
    }
    if (img) {
      return (
        <div className={classes.iconContainer}>
          <img
            src={img}
            className={classes.image}
            alt="icon"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div onMouseEnter={onMouseEnter}>
      <div
        className={classes.container}
        onClick={itemAction}
      >
        <div className={classes.iconLabelContainer}>
          {getIcon()}
          <Typography className={classes.label}>
            {label}
          </Typography>
        </div>
        {
          hasSubItems && (
            <FontAwesomeIcon
              className={classes.angleRightIcon}
              icon={faAngleRight}
            />
          )
        }
      </div>
      <Popper
        id={`${id}-popper`}
        open={isSelected}
        anchorEl={anchorEl}
        placement={placement || 'right'}
      >
        <CreateNewMenu
          items={subItems}
          close={closeParent}
          isSubmenu
        />
      </Popper>
    </div>
  );
};

Option.defaultProps = {
  onClick: () => { },
  subItems: [],
  icon: null,
  img: null,
  selectedItem: null,
  placement: null,
};

Option.propTypes = {
  icon: PropTypes.shape({}),
  img: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subItems: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.string.isRequired,
  closeParent: PropTypes.func.isRequired,
  selectedItem: PropTypes.string,
  setSelectedItem: PropTypes.func.isRequired,
  placement: PropTypes.string,
};

export default Option;
