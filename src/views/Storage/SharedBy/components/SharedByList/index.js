import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShareBox from '@ui/ShareBox';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { fetchBuckets } from '@events';
import useStyles from './styles';

const MAX_SHOWN_OBJECTS = 3;

const breakpointColumnsObj = {
  default: 8,
  2000: 7,
  1800: 6,
  1600: 5,
  1400: 4,
  1200: 3,
  950: 2,
  750: 1,
};

const SharedBy = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const bucketsList = useSelector((state) => (
    Object.values(state.storage.buckets)
  ));

  useEffect(() => {
    fetchBuckets();
  }, []);

  const sharedBuckets = bucketsList.filter(
    (bucket) => bucket.name !== 'personal',
  );

  return (
    <div className={classes.root}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryColumn}
      >
        {sharedBuckets.map((bucket) => (
          <div key={bucket.name} className={classes.itemWrapper}>
            <ShareBox
              user={bucket.membersList[0]}
              objectsList={bucket.objects.slice(0, MAX_SHOWN_OBJECTS)}
              showViewAllBtn={bucket.objects.length > MAX_SHOWN_OBJECTS}
              onViewAllClick={() => {
                history.push(`/storage/shared-by/${bucket.name}`);
              }}
              onObjectClick={(obj) => {
                history.push(`/storage/shared-by/${bucket.name}/${obj.name}`);
              }}
              i18n={{
                subtitle: t('modules.storage.sharedBy.mostRecentShared'),
                viewAll: t('modules.storage.sharedBy.viewAll'),
              }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default SharedBy;
