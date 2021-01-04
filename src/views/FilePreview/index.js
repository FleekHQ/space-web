import React from 'react';
import { useParams } from 'react-router-dom';

const FilePreview = () => {
  const { hash } = useParams();

  return (
    <div>
      FilePreview for file: {`${hash}`}
    </div>
  );
};

export default FilePreview;
