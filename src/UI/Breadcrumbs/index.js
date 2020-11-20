import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons/faAngleRight';
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Breadcrumbs = ({ items, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {items.map((item, index) => (
        <>
          {(index > 0) && (
            <FontAwesomeIcon
              icon={faAngleRight}
              className={classes.separator}
            />
          )}
          <ButtonBase
            className={classes.button}
            onClick={() => history.push(item.path)}
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
      ))}
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
