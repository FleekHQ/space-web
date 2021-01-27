import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';

export const CONTEXT_OPTION_IDS = {
  open: 'open',
  share: 'share',
  rename: 'rename',
  trash: 'trash',
  copyLink: 'copyLink',
  copyIPFSHash: 'copyIPFSHash',
  copyDealId: 'copyDealId',
  preview: 'preview',
  download: 'download',
};

const ContextMenu = ({
  menuItemOnClick,
  items,
  onClickAway,
}) => {
  const classes = useStyles();

  const getMenuItem = (item) => {
    if (item.type === 'divider') {
      return (
        <Divider className={classes.divider} />
      );
    }
    return (
      <MenuItem
        disabled={item.disabled}
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
              />
            ) : (
              <img
                className={classes.image}
                src={item.image}
                alt={item.id}
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
    );
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Paper
        className={classes.paper}
        data-prevent-details-panel-collapse="true"
      >
        {items.map((item) => (
          getMenuItem(item)
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
      type: PropTypes.string,
    }),
  ).isRequired,
  onClickAway: PropTypes.func.isRequired,
};

export default ContextMenu;
