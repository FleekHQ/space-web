import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import DetailsPanel from './components/DetailsPanel';
import useStyles from './styles';

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.mainContent}>
        {children}
      </div>
      <div>
        <DetailsPanel />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
