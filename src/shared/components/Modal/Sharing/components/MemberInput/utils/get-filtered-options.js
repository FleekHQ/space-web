import isEqual from 'lodash/isEqual';

// removes already selected items from the list
const getFilteredOptions = (emailAddresses, collaborators) => {
  const filteredOptions = collaborators.filter((collaborator) => {
    let collaboratorAlreadyChosen = false;
    emailAddresses.forEach((emailAddress) => {
      if (isEqual(emailAddress, collaborator)) {
        collaboratorAlreadyChosen = true;
      }
    });
    return !collaboratorAlreadyChosen;
  });
  return filteredOptions;
};

export default getFilteredOptions;
