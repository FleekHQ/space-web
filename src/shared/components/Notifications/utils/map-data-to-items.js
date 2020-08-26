import get from 'lodash/get';
import { formatBytes } from '@utils';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';
import store from '../../../../store';

export const INVITATION = 'INVITATION';
export const USAGEALERT = 'USAGEALERT';
export const SHARE_INVITE = 'share-invite';
export const BACKUP_LIMIT = 'backup-limit';

const mapBackupLimitItem = (item) => {
  const { PUBLIC_URL } = process.env;
  const {
    id,
    createdAt,
    relatedObject:
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
  });
};

const mapInvitationItem = (item) => {
  const {
    id,
    subject,
    body,
    createdAt,
    relatedObject:
    {
      itemPaths,
    },
  } = item;
  const splitPath = itemPaths.split('/');
  const file = splitPath[splitPath.length - 1];
  /* eslint-disable-next-line no-useless-escape */
  const testIsExtension = /^[\w\!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+\.[\w]+$/;
  const isExtension = testIsExtension.test(file);
  const fileSplit = file.split('.');

  return ({
    id,
    type: SHARE_INVITE,
    username: subject,
    timestamp: createdAt,
    description: body,
    files: [{
      name: file,
      ext: isExtension && fileSplit[fileSplit.length - 1],
    }],
  });
};

const mapDataToItems = (data) => {
  const notifications = get(data, 'data.notifications', []);

  const mappedData = notifications.map((item) => {
    const { type } = item;
    switch (type) {
      case USAGEALERT:
        return mapBackupLimitItem(item);
      case INVITATION:
      default:
        return mapInvitationItem(item);
    }
  });

  return mappedData;
};

export default mapDataToItems;
