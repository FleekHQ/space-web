import get from 'lodash/get';

const bucketPresenter = (bucket = {}) => {
  const key = get(bucket, 'key', '');
  const name = get(bucket, 'name', '');
  const path = get(bucket, 'path', '');
  const createdAt = new Date(get(bucket, 'createdAt'));
  const updatedAt = new Date(get(bucket, 'updatedAt'));
  const membersList = get(bucket, 'membersList', []);
  const isSelectGroupBucket = get(bucket, 'isSelectGroupBucket', false);

  return {
    key,
    name,
    path,
    createdAt,
    updatedAt,
    membersList,
    isSelectGroupBucket,
  };
};

export default bucketPresenter;
