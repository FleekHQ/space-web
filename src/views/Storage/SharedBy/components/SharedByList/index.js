import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShareBox, { ShareBoxSkeleton } from '@ui/ShareBox';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
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
  const [bucketsList, loading] = useSelector((state) => [
    Object.values(state.storage.buckets),
    state.storage.bucketsListLoading,
  ]);

  useEffect(() => {
    fetchBuckets();
  }, []);

  const sharedBuckets = bucketsList.filter(
    (bucket) => bucket.name !== 'personal',
  );

  const i18n = {
    subtitle: t('modules.storage.sharedBy.mostRecentShared'),
    viewAll: t('modules.storage.sharedBy.viewAll'),
  };

  const getContent = () => (
    sharedBuckets.length === 0
      ? (
        <Typography color="secondary" className={classes.centerText}>
          {t('modules.storage.sharedBy.emptyList')}
        </Typography>
      ) : sharedBuckets.map((bucket) => (
        <div key={bucket.name} className={classes.itemWrapper}>
          <ShareBox
            usersList={bucket.membersList}
            objectsList={bucket.objects.slice(0, MAX_SHOWN_OBJECTS)}
            showViewAllBtn={bucket.objects.length > MAX_SHOWN_OBJECTS}
            onViewAllClick={() => {
              history.push(`/storage/shared-by/${bucket.name}`);
            }}
            onObjectClick={(obj) => {
              history.push(`/storage/shared-by/${bucket.name}/${obj.name}`);
            }}
            i18n={i18n}
          />
        </div>
      ))
  );

  return (
    <div className={classes.root}>
      {/* Todo: Remove this */}
      <Link to="/storage/shared-by/bucket-test">Bucket test</Link>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryColumn}
      >
        {(loading && sharedBuckets.length === 0)
          ? Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={classes.itemWrapper}>
              <ShareBoxSkeleton i18n={i18n} />
            </div>
          )) : getContent()}
      </Masonry>
    </div>
  );
};

export default SharedBy;
