import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import useStyles from './styles';

export const CONTEXT_OPTION_IDS = {
  open: 'open',
  share: 'share',
  rename: 'rename',
  trash: 'trash',
  copyLink: 'copyLink',
  copyIPFSHash: 'copyIPFSHash',
  copyDealId: 'copyDealId',
};

const ContextMenu = ({
  menuItemOnClick,
  items,
  onClickAway,
}) => {
  const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Paper className={classes.paper}>
        {items.map((item) => (
          <MenuItem
            data-prevent-details-panel-collapse="true"
            className={classes.menuItem}
            onClick={() => menuItemOnClick(item.id)}
          >
            <div
              className={classes.iconContainer}
            >
              {
                item.icon ? (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={classes.icon}
                    data-prevent-details-panel-collapse="true"
                  />
                ) : (
                  <img
                    className={classes.image}
                    src={item.image}
                    alt={item.id}
                    data-prevent-details-panel-collapse="true"
                  />
                )
              }
            </div>
            <Typography
              className={classes.displayText}
            >
              {item.displayText}
            </Typography>
          </MenuItem>
        ))}
      </Paper>
    </ClickAwayListener>
  );
};

ContextMenu.propTypes = {
  menuItemOnClick: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    open: PropTypes.string,
    share: PropTypes.string,
    rename: PropTypes.string,
    trash: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayText: PropTypes.string,
      icon: PropTypes.element,
      image: PropTypes.string,
    }),
  ).isRequired,
  onClickAway: PropTypes.func.isRequired,
};

export default ContextMenu;
