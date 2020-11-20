import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { listStyles, itemStyles, useStyles } from './styles';

const MenuDropdown = ({
  items,
  onItemClick,
}) => {
  const listClasses = listStyles();
  const itemClasses = itemStyles();
  const classes = useStyles();

  return (
    <List classes={listClasses}>
      {
        items.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              classes={itemClasses}
              onClick={(event) => {
                event.preventDefault();
                onItemClick(item, index);
              }}
            >
              <div className={classes.iconContainer}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <Typography color="inherit">
                {item.name}
              </Typography>
            </ListItem>
            {
              item.divider && <Divider />
            }
          </React.Fragment>
        ))
      }
    </List>
  );
};

MenuDropdown.defaultProps = {
  items: [],
};

MenuDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    divider: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.shape({}).isRequired,
  }).isRequired),
  onItemClick: PropTypes.func.isRequired,
};

export default MenuDropdown;
