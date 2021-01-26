const download = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', filename);
  a.click();
};

export default download;
