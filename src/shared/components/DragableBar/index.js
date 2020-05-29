import React, { useState } from 'react';
import useStyles from './styles';

const noTopbar = window.innerHeight === window.outerHeight;

const DragableBar = () => {
  const [isDragable, setIsDragable] = useState(false);
  const classes = useStyles({ isDragable });

  if (noTopbar) {
    return (
      <div
        className={classes.root}
        onMouseEnter={() => setIsDragable(true)}
        onMouseLeave={() => setIsDragable(false)}
      >
        <div className={classes.dragableArea} />
      </div>
    );
  }

  return null;
};

export default DragableBar;
