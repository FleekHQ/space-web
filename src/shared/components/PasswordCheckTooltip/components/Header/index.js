import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';

import useStyles from './styles';

const Header = ({ t }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootHeader}>
      <FontAwesomeIcon icon={faInfoCircle} />
      <Typography variant="body2" color="inherit">{t('modules.shared.passwordCheck.title')}</Typography>
    </div>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Header;
