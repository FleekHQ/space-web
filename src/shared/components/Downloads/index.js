import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DOWNLOAD_STATES, DOWNLOAD_ACTION_TYPES } from '@reducers/downloads';

import useStyles from './styles';
import { DownloadProgress } from './components';

const Downloads = () => {
  const dispatch = useDispatch();
  const downloads = useSelector((state) => Object
    .keys(state.downloads)
    .filter((uuid) => state.downloads[uuid].status !== DOWNLOAD_STATES.finished)
    .filter((uuid) => !state.downloads[uuid].hide)
    .reduce((acc, uuid) => [...acc, { uuid, ...state.downloads[uuid] }], []));

  const classes = useStyles();

  const onClickDismiss = (uuid) => dispatch({
    type: DOWNLOAD_ACTION_TYPES.HIDE_DOWNLOAD,
    payload: { uuid },
  });

  return (
    <div className={classes.root}>
      {downloads.map((download) => (
        <DownloadProgress
          key={download.uuid}
          filename={download.filename}
          progress={download.progress}
          status={download.status}
          errorMessage={download.error}
          onClickDismiss={() => onClickDismiss(download.uuid)}
        />
      ))}
    </div>
  );
};

export default Downloads;
