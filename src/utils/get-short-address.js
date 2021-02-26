/**
 * Get short address
 * @param address - The public key
 * @returns {string} Short address
 */
export default (address = '') => {
  if (!address) return '';
  if (address.length < 4) return address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`;
};
