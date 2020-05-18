import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconFA = ({
  classes,
  icon,
  iconColor,
  fontSize,
  color,
  className,
  iconStyles,
  overrideSvg,
  ...restProps
}) => (
    <div
      {...restProps}
      className={[
        classes.iconContainer,
        fontSize ? `font-size--${fontSize}` : '',
        color ? `color--${color}` : '',
        className,
      ].join(' ')}
    >
      <FontAwesomeIcon
        icon={icon}
        className={[
          classes.fontAwesomeOverrides,
          'font-size--reset', // NOTE: Extra class needed to add css weight to override font awesome default
          iconStyles,
          classes[overrideSvg],
        ].join(' ')}
        style={{ color: iconColor }}
      />
    </div>
  );

IconFA.defaultProps = {
  className: '',
  iconColor: 'dark',
  overrideSvg: '',
};

IconFA.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  icon: FontAwesomeIcon.propTypes.icon.isRequired,
  iconColor: PropTypes.string,
  fontSize: PropTypes.oneOf(['inherit', 'small', 'large', 'veryLarge', '']),
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'dark',
    'gray',
    'red',
    'black',
    '',
  ]),
  iconStyles: PropTypes.string,
  overrideSvg: PropTypes.string,
};

IconFA.defaultProps = {
  color: '',
  fontSize: '',
  iconStyles: '',
};

export default IconFA;
