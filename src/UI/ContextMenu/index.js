import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './styles';

export const CONTEXT_OPTION_IDS = {
  open: 'open',
  share: 'share',
  rename: 'rename',
  trash: 'trash',
};

const ContextMenu = ({
  menuItemOnClick,
  i18n,
}) => {
  const classes = useStyles();

  const items = [
    CONTEXT_OPTION_IDS.open,
    CONTEXT_OPTION_IDS.share,
    CONTEXT_OPTION_IDS.rename,
    CONTEXT_OPTION_IDS.trash,
  ];

  return (
    <Paper className={classes.paper}>
      {items.map((item) => (
        <MenuItem
          className={classes.menuItem}
          onClick={() => menuItemOnClick(item)}
        >
          {i18n[item]}
        </MenuItem>
      ))}
    </Paper>
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
};

export default ContextMenu;
