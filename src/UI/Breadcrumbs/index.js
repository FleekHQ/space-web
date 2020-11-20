import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons/faAngleRight';
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const Breadcrumbs = ({ items }) => {
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
          >
            {item.type === 'folder' && (
              <FontAwesomeIcon
                icon={faFolder}
                className={classes.icon}
              />
            )}
            {item.name}
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
};

export default Breadcrumbs;
