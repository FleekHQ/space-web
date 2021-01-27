import get from 'lodash/get';

export const getCollaboratorsInfo = (collaborators, owner, members) => {
  const items = collaborators.map((collaborator) => {
    const collaboratorInfo = members.find((member) => member.publicKey === collaborator.publicKey);

    return {
      id: collaborator.publicKey,
      permissionsId: 'edit',
      secondaryText: collaboratorInfo ? collaboratorInfo.email : '',
      mainText: collaboratorInfo ? collaboratorInfo.displayName : collaborator.address,
      ...(collaboratorInfo && { imageSrc: collaboratorInfo.avatarUrl }),
    };
  });

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
    ...items.filter((item) => item.id !== ownerId),
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
