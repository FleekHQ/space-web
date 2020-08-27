// at least one upper case, 1 lower case, 1 digit, 1 special char and min 8 chars length
const PASSWORD_REGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

/**
 * Verify is form is valid
 * @param {string} newPassword
 * @param {string} confirmPassword
 * @return {Boolean}
 */
const verifyFormValidation = (newPassword, confirmPassword) => (
  newPassword.length > 0 && PASSWORD_REGEX.test(newPassword)
  && newPassword === confirmPassword
);

export default {
  verifyFormValidation,
};
