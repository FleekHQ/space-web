import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { faCopy } from '@fortawesome/pro-regular-svg-icons/faCopy';
import { faComment } from '@fortawesome/pro-regular-svg-icons/faComment';
import useStyles from './styles';

const mapNameToIcon = {
  files: faCopy,
  settings: faCog,
  comments: faComment
};

const IconsNavigation = ({ options, WrapperComponent }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {options.map(({ active, icon, ...restProps }) => (
        <WrapperComponent {...restProps}>
          <Button
            color={active ? 'primary' : 'default'}
            variant={active ? 'contained' : 'text'}
            className={classes.button}
            fullWidth
          >
            <FontAwesomeIcon icon={mapNameToIcon[icon]} />
          </Button>
        </WrapperComponent>
      ))}
    </div>
  );
};

IconsNavigation.defaultProps = {
  WrapperComponent: 'a'
};

IconsNavigation.propTypes = {
  option: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.oneOf(Object.keys(mapNameToIcon)).isRequired,
    active: PropTypes.bool,
  })).isRequired,
  WrapperComponent: PropTypes.node,
};

export default IconsNavigation;
