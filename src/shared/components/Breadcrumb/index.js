import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Avatar from '@ui/Avatar';

import useStyles from './styles';

const Breadcrumb = ({
  link,
  name,
  imgUrl,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        imgUrl && (
          <Avatar
            size={18}
            imgUrl={imgUrl}
            username={name}
          />
        )
      }
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
  imgUrl: null,
};

Breadcrumb.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Breadcrumb;
