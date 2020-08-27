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

  return [
    {
      id: get(owner, 'publicKey', 'owner'),
      permissionsId: 'edit',
      isOwner: true,
      mainText: get(owner, 'username', 'You'),
      ...(ownerAvatar && { imageSrc: ownerAvatar }),
    },
    ...items,
  ];
};

export const mapIdentitiesToCollaborators = (identities = []) => identities.map((identity) => ({
  id: identity.publicKey,
  mainText: identity.username,
  username: identity.username,
  publicKey: identity.publicKey,
  ...(identity.avatarUrl && { imageSrc: identity.avatarUrl }),
}));
