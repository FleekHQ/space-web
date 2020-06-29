const validateForm = ({ tfEmail, tfUsername }) => {
  if (!tfUsername.length) {
    return false;
  }

  if (!tfEmail.length) {
    return true;
  }

  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(tfEmail);
};

export default {
  validateForm,
};
