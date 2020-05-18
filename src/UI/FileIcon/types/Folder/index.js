import React from 'react';
import IconFA from '@ui/IconFA';
import classnames from 'classnames';
import useStyles from '../../styles';


const Folder = () => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.container, classes.folder)}>
      <IconFA
        icon={['fas', 'folder']}
        fontSize="inherit"
        iconColor="inherit"
      />
    </div>
  )};

export default Folder;
