import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const Footer = (props) => {
  const {
    i18n,
    onClick,
    className,
  } = props;

  const classes = useStyles();

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <Typography
        variant="body2"
        weight="medium"
        className={classes.title}
      >
        {i18n.title}
      </Typography>
      <div className={classes.container}>
        <div className={classes.accessContainer}>
          <FontAwesomeIcon
            icon={faEye}
            className={classes.icon}
          />
          <div>
            <Typography variant="body2" weight="medium">
              {i18n.canView}
            </Typography>
            <Typography variant="body2" color="secondary">
              {i18n.description}
            </Typography>
          </div>
        </div>
        <Button
          size="small"
          color="primary"
          onClick={onClick}
        >
          <Typography variant="body2" weight="medium" color="inherit">
            {i18n.cta}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  className: null,
  onClick: () => {},
};

Footer.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  i18n: PropTypes.shape({
    cta: PropTypes.string,
    title: PropTypes.string,
    canView: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Footer;
