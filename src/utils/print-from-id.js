const printFromId = (id) => {
  const container = document.getElementById(id);
  if (!container) {
    return;
  }

  if (container.tagName === 'IFRAME') {
    const frameContent = container.contentWindow;
    frameContent.focus();
    frameContent.print();
    return;
  }

  const contents = container.innerHTML;
  const a = window.open('', '', 'height=1400, width=1000');
  a.document.write('<html><body>');
  a.document.write(contents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
};

export default printFromId;
