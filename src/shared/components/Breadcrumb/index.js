import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Breadcrumb = ({
  link,
  name,
  startAdornment,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {startAdornment}
      <Typography
        variant="h6"
        to={link}
        component={Link}
        classes={{
          root: classes.typographyRoot,
        }}
      >
        {name}
      </Typography>
    </div>
  );
};

Breadcrumb.defaultProps = {
  startAdornment: null,
};

Breadcrumb.propTypes = {
  startAdornment: PropTypes.node,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Breadcrumb;
