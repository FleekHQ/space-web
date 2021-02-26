import get from 'lodash/get';

export const getCollaboratorsInfo = (owner, selectedIdentities, members) => {
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
    ...members,
  ];
};

/* TO-DO: Remove deletable once sdk supports deleting file collaborators */
export const mapIdentitiesToCollaborators = (identities = [], deletable = true) => (
  identities.map((identity) => ({
    id: identity.publicKey,
    mainText: identity.displayName,
    secondaryText: identity.email,
    username: identity.displayName,
    publicKey: identity.publicKey,
    ...(identity.avatarUrl && { imageSrc: identity.avatarUrl }),
    deletable,
  }))
);

export const mapMemberToCollaborator = (members) => members.map((member) => ({
  id: member.publicKey,
  mainText: member.address,
  deletable: false,
}));

export const getIdentitiesFromMembers = (members, identities) => {
  const memberIdentities = [];
  const membersWithoutIdentities = [];
  const memberAddresses = members.map((member) => member.address);
  const reducedMemberIdentities = identities.reduce((filteredIdentities, identity) => {
    if (memberAddresses.includes(identity.address)) {
      filteredIdentities.push(identity);
    }

    return filteredIdentities;
  }, []);

  members.forEach((member) => {
    const identity = reducedMemberIdentities.filter((currentIdentity) => (
      member.address === currentIdentity.address
    ));

    if (identity.length > 0) {
      memberIdentities.push(identity[0]);
    } else {
      membersWithoutIdentities.push(member);
    }
  });

  return [memberIdentities, membersWithoutIdentities];
};

export const getRecentlySharedIdentities = (identities) => (
  identities.reduce((recentlySharedIdentities, identity) => {
    const { recentlyShared } = identity;

    if (recentlyShared !== undefined && recentlyShared) {
      recentlySharedIdentities.push(identity);
    }

    return recentlySharedIdentities;
  }, [])
);
