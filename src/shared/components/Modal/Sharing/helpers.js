import get from 'lodash/get';

export const getCollaboratorsInfo = (owner, selectedIdentities) => {
  const ownerAvatar = get(owner, 'avatarUrl');
  const ownerId = get(owner, 'publicKey', 'owner');

  return [
    {
      id: ownerId,
      permissionsId: 'edit',
      isOwner: true,
      secondaryText: get(owner, 'email'),
      mainText: get(owner, 'displayName', 'You'),
      ...(ownerAvatar && { imageSrc: ownerAvatar }),
    },
    ...selectedIdentities,
  ];
};

export const mapIdentitiesToCollaborators = (identities = []) => identities.map((identity) => ({
  id: identity.publicKey,
  mainText: identity.displayName,
  secondaryText: identity.email,
  username: identity.displayName,
  publicKey: identity.publicKey,
  ...(identity.avatarUrl && { imageSrc: identity.avatarUrl }),
}));

export const mapKeyedIdentitiesToMembers = (data = {}) => {
  const { identities } = data;

  if (!Object.entries(identities).length || identities === null) {
    return [];
  }
  const identityValues = Object.values(identities);

  return identityValues.map((identity) => ({
    id: identity.publicKey,
    mainText: identity.displayName,
    email: identity.email,
    username: identity.displayName,
    secondaryText: '',
    publicKey: identity.publicKey,
    imageSrc: identity.avatarUrl,
  }));
};
