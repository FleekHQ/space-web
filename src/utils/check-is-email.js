const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Check if a string value is an email
 * @param {string} value - Value to check if it is an email
 * @returns {Boolean}
 */
export default function checkIsEmail(value) {
  return EMAIL_REGEX.test(value);
}
