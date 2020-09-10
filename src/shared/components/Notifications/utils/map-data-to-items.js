import React from 'react';
import { formatBytes } from '@utils';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';
import store from '../../../../store';

export const INVITATION = 'INVITATION';
export const USAGEALERT = 'USAGEALERT';
export const SHARE_INVITE = 'share-invite';
export const BACKUP_LIMIT = 'backup-limit';

const getHighlighted = (item, lastSeenAt) => (item.createdAt > lastSeenAt);

const mapBackupLimitItem = (item, lastSeenAt) => {
  const { PUBLIC_URL } = process.env;
  const {
    id,
    createdAt,
    usageAlert:
      {
        used,
        limit,
      },
  } = item;

  return ({
    id,
    type: BACKUP_LIMIT,
    currentAmountText: formatBytes(used),
    limitText: formatBytes(limit),
    timestamp: createdAt,
    logoUrl: `${PUBLIC_URL}/assets/images/space.svg`,
    upgradeOnClick: () => store.dispatch(openModal(SETTINGS_MODAL)),
    highlighted: getHighlighted(item, lastSeenAt),
  });
};

const mapInvitationItem = (item, lastSeenAt, Trans, t, classes) => {
  const {
    id,
    subject,
    createdAt,
    invitationValue:
    {
      itemPaths,
      status,
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
    username: subject,
    timestamp: createdAt,
    description: getDescription(),
    files: itemPaths.map((itemPath) => {
      const currentFileSplitPath = itemPath.path.split('/');
      const currentFile = currentFileSplitPath[currentFileSplitPath.length - 1];
      const currentFileExtension = currentFile.split('.');
      const testIsExtension = /^[\w!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+\.[\w]+$/;
      const isExtension = testIsExtension.test(currentFile);
      return ({
        name: currentFile,
        ext: isExtension && currentFileExtension[currentFileExtension.length - 1],
      });
    }),
    status,
    highlighted: getHighlighted(item, lastSeenAt),
  });
};

const mapDataToItems = (data, Trans, t, classes) => {
  const { data: { notifications, lastSeenAt } } = data;

  const mappedData = notifications.reduce((arr, item) => {
    const { type } = item;
    if (type === USAGEALERT) {
      return arr.concat(mapBackupLimitItem(item, lastSeenAt));
    }

    if (type === INVITATION) {
      return arr.concat(mapInvitationItem(item, lastSeenAt, Trans, t, classes));
    }

    return arr;
  }, []);

  return mappedData;
};

export default mapDataToItems;
