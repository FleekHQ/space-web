import React from 'react';
import Sidebar from '../../../components/Sidebar';
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
        Right panel, with files/folders details
        + check if user is authorized (already setup the app config)
      </div>
    </div>
  );
};

export default Layout;
