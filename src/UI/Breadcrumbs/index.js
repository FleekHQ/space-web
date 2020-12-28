import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons/faAngleRight';
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import Dropdown from './components/Dropdown';
import ThreeDotsButton from './components/ThreeDotsButton';

import useStyles from './styles';

const Breadcrumbs = ({ items, history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const MAX_ITEMS = 4;
  const showThreeDots = items.length > MAX_ITEMS;

  let itemsWithThreeDots = [];
  let itemsInThreeDotsMenu = [];
  if (showThreeDots) {
    itemsInThreeDotsMenu = items.slice(1, items.length - MAX_ITEMS + 1);
    itemsWithThreeDots = [
      items[0],
      { type: 'three-dots', items: itemsInThreeDotsMenu },
      ...items.slice(-(MAX_ITEMS - 1)),
    ];
  } else {
    itemsWithThreeDots = items;
  }

  const onItemClick = (item) => {
    history.push(item.path);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.container}>
      {itemsWithThreeDots.map((item, index) => {
        if (item.type === 'three-dots') {
          return (
            <>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={classes.separator}
              />
              <ThreeDotsButton
                onClick={handleClick}
                isActive={open}
              />
            </>
          );
        }

        return (
          <>
            {(index > 0) && (
              <FontAwesomeIcon
                icon={faAngleRight}
                className={classes.separator}
              />
            )}
            <ButtonBase
              className={classes.button}
              onClick={() => onItemClick(item)}
            >
              {item.type === 'folder' && (
                <FontAwesomeIcon
                  icon={faFolder}
                  className={classes.icon}
                />
              )}
              <Typography className={classes.itemName}>
                {item.name}
              </Typography>
            </ButtonBase>
          </>
        );
      })}
      <Popover
        id="breadcrumb-three-dots"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Dropdown
          items={itemsInThreeDotsMenu}
          onItemClick={(item) => { onItemClick(item); handleClose(); }}
        />
      </Popover>
    </div>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Breadcrumbs;
