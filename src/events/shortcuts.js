const registerShortCuts = () => {
  document.onkeyup = (e) => {
    // ctrl + shift + u
    if (e.ctrlKey && e.shiftKey && e.which === 85) {
      document.getElementById('setup-wd').style.display = 'flex';
    }
  };
};

export default registerShortCuts;
