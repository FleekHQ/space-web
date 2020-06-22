import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@ui/FileIcon';
import classnames from 'classnames';
import Typography from '@ui/Typography';

import useStyles from './styles';

const Header = ({ ext, children, className }) => {
  const classes = useStyles();

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <div className={classes.icon}>
        <FileIcon ext={ext} />
      </div>
      <Typography
        variant="body1"
        className={classes.title}
      >
        {children}
      </Typography>
    </div>
  );
};

Header.defaultProps = {
  children: '',
  ext: 'default',
  className: null,
};

Header.propTypes = {
  ext: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
