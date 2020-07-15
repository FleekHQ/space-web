const getObjectRegex = (bucket, prefix, delimiter) => {
  const bucketPath = bucket ? `${bucket}` : '';
  const prefixPath = prefix ? `/${prefix}/` : '/';

  const prefixRegex = `${bucketPath}${prefixPath}`.replace(/\//g, '\\/');
  const delimiterRegex = `[^${delimiter}]*${delimiter}?$`.replace(/\//g, '\\/');

  return new RegExp(prefixRegex + delimiterRegex);
};

export default getObjectRegex;
