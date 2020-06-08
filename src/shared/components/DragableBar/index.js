import React, { useState } from 'react';
import useStyles from './styles';

const isMac = process.platform === 'darwin';

const DragableBar = () => {
  const [isDragable, setIsDragable] = useState(false);
  const classes = useStyles({ isDragable });
  const onDoubleClick = () => {
    const browserWindow = window.remote.getCurrentWindow();
    if (browserWindow.isMaximized()) {
      browserWindow.unmaximize();
    } else {
      browserWindow.maximize();
    }
  };

  if (isMac) {
    return (
      <div
        className={classes.root}
        onMouseEnter={() => setIsDragable(true)}
        onMouseLeave={() => setIsDragable(false)}
        onDoubleClick={onDoubleClick}
      >
        <div className={classes.dragableArea} />
      </div>
    );
  }

  return null;
};

export default DragableBar;
