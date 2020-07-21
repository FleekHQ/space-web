const validateCustomEmail = (email) => {
  const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  return emailRegEx.test(email);
};

const isEmailError = (newEmail, emailAddresses, setEmailError, emailErrors) => {
  const isInputEmpty = newEmail === '';
  if (isInputEmpty) {
    return true;
  }

  const isEmailValid = validateCustomEmail(newEmail);

  const duplicateEmail = emailAddresses.find((email) => (
    email.secondaryText.toLowerCase() === newEmail.toLowerCase()
  ));

  if (!isEmailValid) {
    setEmailError(emailErrors.invalidEmail);
    return true;
  }

  if (duplicateEmail) {
    setEmailError(emailErrors.duplicateEmail);
    return true;
  }

  return false;
};

export default isEmailError;
