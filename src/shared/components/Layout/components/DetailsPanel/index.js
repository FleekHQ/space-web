import React from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import Empty from './components/Empty';
import Header from './components/Header';
import ObjectDetails from './components/ObjectDetails';
import SharePanel from './components/SharePanel';
import useStyles from './styles';

const useTestingData = () => {
  const location = useLocation();
  const prefix = get(
    matchPath(location.pathname, { path: '/storage/files/*' }),
    'params[0]',
    '',
  );
  const re = new RegExp(`^${localStorage.getItem('_wd')}/${prefix ? `${prefix}/` : ''}[^/]*$`);
  const selectedObjects = useSelector((state) => (
    state.storage.objects.filter(({ key }) => re.test(key))
  ));

  return selectedObjects;
};

const DetailsPanel = () => {
  const classes = useStyles();
  const selectedObjects = useTestingData();

  const getContent = () => {
    if (selectedObjects.length === 0) {
      return <Empty />;
    }

    return (
      <>
        <Header objects={selectedObjects} />
        {selectedObjects.length === 1 && (
          <>
            <div className={classes.divider} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ObjectDetails {...selectedObjects[0]} />
            <div className={classes.divider} />
            <SharePanel />
          </>
        )}
      </>
    );
  };

  return (
    <div className={classes.root}>
      {getContent()}
    </div>
  );
};
export default DetailsPanel;
