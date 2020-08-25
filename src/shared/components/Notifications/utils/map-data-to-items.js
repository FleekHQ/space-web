import get from 'lodash/get';

export const INVITATION = 'INVITATION';
export const USAGEALERT = 'USAGEALERT';
export const SHARE_INVITE = 'share-invite';
export const BACKUP_LIMIT = 'backup-limit';

const mapBackupLimitItem = () => {};

const mapInvitationItem = (item) => {
  const { relatedObject: { itemPaths } } = item;
  // TODO: what are multiple files separated by in the filepaths field
  const splitPath = itemPaths.split('/');
  const file = splitPath[splitPath.length - 1];
  /* eslint-disable-next-line */
  const testIsExtension = /^[\w\!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+\.[\w]+$/;
  const isExtension = testIsExtension.test(file);
  const fileSplit = file.split('.');

  return ({
    id: item.id,
    type: SHARE_INVITE,
    username: item.subject,
    timestamp: item.createdAt,
    description: item.subject,
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

  // console.log('mappeddata', mappedData);
  return mappedData;
};

export default mapDataToItems;
