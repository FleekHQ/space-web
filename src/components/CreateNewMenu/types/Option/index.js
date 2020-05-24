import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const Option = ({
  id,
  icon,
  label,
  subItems,
  onClick,
  setParentOpen,
}) => {
  const classes = useStyles();
  const [popperOpen, setPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const hasSubItems = subItems.length > 0;

  const onMouseEnter = (e) => {
    if (hasSubItems) {
      setAnchorEl(anchorEl || e.currentTarget);
      setPopperOpen(true);
    }
  };

  const onMouseLeave = () => setPopperOpen(false)

  const itemAction = (e) => {
    if (!hasSubItems) {
      onClick(e);
      setParentOpen(false);
    }
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div
        className={classes.container}
        onClick={itemAction}
      >
        <div className={classes.iconLabelContainer}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={icon}
          />
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
        open={popperOpen}
        anchorEl={anchorEl}
        placement="right-end"
      >
        {() => (
          <div className={classes.paper}>SUBMENU COMPONENT TODO</div>
        )}
      </Popper>
    </div>
  );
};

Option.defaultProps = {
  onClick: () => {},
  subItems: [],
};

Option.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subItems: PropTypes.array,
  id: PropTypes.string.isRequired,
  setParentOpen: PropTypes.func.isRequired,
};

export default Option;
