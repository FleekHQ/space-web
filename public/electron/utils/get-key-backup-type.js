const { KeyBackupType } = require('@fleekhq/space-client/dist/definitions/space_pb');

const TYPE_OF_LOGIN = {
  google: KeyBackupType.GOOGLE,
  twitter: KeyBackupType.TWITTER,
  password: KeyBackupType.PASSWORD,
  passwordless: KeyBackupType.EMAIL,
};

/**
 * Get number based on type of login
 * @param {Object} opts
 * @param {String} opts.typeOfLogin
 */
const getKeyBackupType = ({ typeOfLogin }) => {
  if (typeof TYPE_OF_LOGIN[typeOfLogin] === 'undefined') {
    return '';
  }

  return TYPE_OF_LOGIN[typeOfLogin];
};

module.exports = getKeyBackupType;
