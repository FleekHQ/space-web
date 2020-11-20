import get from 'lodash/get';

export const getCollaboratorsInfo = (collaborators, owner, members) => {
  const items = collaborators.map((collaborator) => {
    const collaboratorInfo = members.find((member) => member.publicKey === collaborator.publicKey);

    return {
      id: collaborator.publicKey,
      permissionsId: 'edit',
      mainText: collaboratorInfo ? collaboratorInfo.username : collaborator.address,
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
      mainText: get(owner, 'username', 'You'),
      ...(ownerAvatar && { imageSrc: ownerAvatar }),
    },
    ...items.filter((item) => item.id !== ownerId),
  ];
};

export const mapIdentitiesToCollaborators = (identities = []) => identities.map((identity) => ({
  id: identity.publicKey,
  mainText: identity.username,
  username: identity.username,
  publicKey: identity.publicKey,
  ...(identity.avatarUrl && { imageSrc: identity.avatarUrl }),
}));
