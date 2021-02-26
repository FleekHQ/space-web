const createErrorObject = ({
  sourcePath,
  bucket,
  isDir,
  size,
}) => {
  const splitSourcePath = sourcePath.split('/');
  const filename = splitSourcePath[splitSourcePath.length - 1];
  const fullKey = `${bucket}/${sourcePath}`.replace('//', '/');
  const timestamp = new Date().getTime();

  const getFileExtension = () => {
    if (isDir) {
      return 'folder';
    }
    const splitFilename = filename.split('.');
    return splitFilename.length === 1 ? '' : splitFilename[splitFilename.length - 1];
  };

  return ({
    key: sourcePath,
    ext: getFileExtension(),
    dbId: undefined,
    type: isDir ? 'folder' : 'file',
    name: filename,
    size,
    bucket,
    members: [],
    created: timestamp,
    bytesSize: '',
    error: true,
    lastModified: timestamp,
    isPublicLink: false,
    isLocallyAvailable: true,
    selected: undefined,
    id: fullKey,
    fullKey,
    ipfsHash: '',
    isAvailableInSpace: false,
    sourceBucket: bucket,
    shareAmount: 1,
    isUploading: true,
    sourcePath,
  });
};

export default createErrorObject;
