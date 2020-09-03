const { SHA3 } = require('sha3');

/**
 * Obtains an address given a public key
 * @param pubKey - The public key
 * @returns {string} Address
 */
const getAddressByPublicKey = (pubKey) => {
  const hash = new SHA3(256);

  // Compute the SHA3-256 hash of the public key
  hash.update(pubKey, 'hex');

  // Get the hex representation of the SHA3-256 hash
  const hexHash = hash.digest('hex');

  // Drop the first 14 bytes (28 characters)
  const trimmedHash = hexHash.substring(28);

  return `0x${trimmedHash}`;
};

module.exports = getAddressByPublicKey;
