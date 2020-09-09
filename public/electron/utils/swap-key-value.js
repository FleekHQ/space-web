const swapKeyValue = (object) => {
  const swapped = {};
  Object.keys(object).forEach((key) => {
    swapped[object[key]] = key;
  });
  return swapped;
};

module.exports = swapKeyValue;
