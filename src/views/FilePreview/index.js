import React from 'react';
import { useParams } from 'react-router-dom';

const FilePreview = () => {
  const { hash } = useParams();
  console.log('hash: ', hash);

  return (
    <div>
      FilePreview
    </div>
  );
};

export default FilePreview;
