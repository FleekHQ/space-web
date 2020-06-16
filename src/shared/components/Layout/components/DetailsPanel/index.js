import React from 'react';
import { useSelector } from 'react-redux';
import Empty from './components/Empty';
import Header from './components/Header';
import ObjectDetails from './components/ObjectDetails';
import SharePanel from './components/SharePanel';
import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  const selectedObjects = useSelector((state) => (
    state.storage.objects.filter(({ selected }) => selected)
  ));

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
