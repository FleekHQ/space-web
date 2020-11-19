import React from 'react';

export const INVITATION = 'INVITATION';
export const SHARE_INVITE = 'share-invite';

const getHighlighted = (item, lastSeenAt) => (item.createdAt * 1000 > lastSeenAt);

const mapInvitationItem = (item, lastSeenAt, Trans, t, classes, identities) => {
  const {
    id,
    createdAt,
    invitationValue:
    {
      itemPaths,
      status,
      inviterPublicKey,
    },
  } = item;
  const file = itemPaths[0].path;

  const getDescription = () => {
    const filePathSplit = file.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1];
    if (itemPaths.length === 1) {
      return (
        <Trans
          i18nKey="notifications.shared"
          values={{
            file: fileName,
          }}
          components={[<span className={classes.bold} />]}
        />
      );
    }
    const amount = itemPaths.length;
    return (
      <Trans
        i18nKey="notifications.shared"
        values={{
          file: t('notifications.files', { amount }),
        }}
        components={[<span className={classes.bold} />]}
      />
    );
  };

  return ({
    id,
    type: SHARE_INVITE,
    username: identities[inviterPublicKey] && identities[inviterPublicKey].username,
    imgUrl: identities[inviterPublicKey] && identities[inviterPublicKey].avatarUrl,
    timestamp: createdAt,
    description: getDescription(),
    files: itemPaths.map((itemPath) => {
      const currentFile = itemPath.path.split('/').pop();
      const currentFileArray = currentFile.split('.');

      return ({
        name: currentFile,
        ext: currentFileArray.length > 1 ? currentFileArray.pop() : '',
      });
    }),
    status,
    highlighted: getHighlighted(item, lastSeenAt),
  });
};

const mapDataToItems = (data, Trans, t, classes, identities) => {
  const { data: { notifications, lastSeenAt } } = data;

  const mappedData = notifications.reduce((arr, item) => {
    const { type, relatedObject } = item;

    //  a bug occured on the backend
    if (relatedObject === 0) {
      return arr;
    }

    if (type === INVITATION) {
      return arr.concat(mapInvitationItem(item, lastSeenAt, Trans, t, classes, identities));
    }

    return arr;
  }, []);

  return mappedData.sort((n1, n2) => n2.timestamp - n1.timestamp);
};

export default mapDataToItems;
