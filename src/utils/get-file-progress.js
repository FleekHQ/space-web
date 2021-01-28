export default (totalBytes, currentBytes) => {
  if (!totalBytes) return 0;

  return Math.ceil((currentBytes * 100) / totalBytes);
};
