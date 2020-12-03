import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';

import useStyles from './styles';

export const HOVER_OPTION_IDS = {
  retry: 'retry',
  cancel: 'cancel',
};

const HoverMenu = ({
  menuItemOnClick,
  items,
  i18n,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {items.map((item) => (
        <>
          <Tooltip
            key={item.id}
            enterDelay={1000}
            enterNextDelay={1000}
            arrow
            interactive
            placement="top"
            classes={{
              popper: classes.popperRoot,
              tooltip: classes.tooltipRoot,
              arrow: classes.tooltipArrow,
            }}
            title={<Typography color="inherit" variant="body2">{i18n[item.id]}</Typography>}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={() => menuItemOnClick(item.id)}
            >
              <div className={classes.iconContainer}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={classnames(classes.icon, {
                    [classes.cancelIcon]: item.id === HOVER_OPTION_IDS.cancel,
                  })}
                />
              </div>
              <Typography
                className={classes.displayText}
              >
                {item.displayText}
              </Typography>
            </MenuItem>
          </Tooltip>
        </>
      ))}
    </Paper>
  );
};

HoverMenu.defaultProps = {
  items: [],
};

HoverMenu.propTypes = {
  menuItemOnClick: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    retry: PropTypes.string,
    cancel: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.element,
    }),
  ),
};

export default HoverMenu;
