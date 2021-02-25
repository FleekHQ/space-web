export const NOTIFICATON_STATUSES = {
  pending: 'PENDING',
  accepted: 'ACCEPTED',
  rejected: 'REJECTED',
};

export const notificationStatusMapper = [
  NOTIFICATON_STATUSES.pending,
  NOTIFICATON_STATUSES.accepted,
  NOTIFICATON_STATUSES.rejected,
];

export const NOTIFICATION_TYPES = {
  fileShareInvitation: 'FILE_SHARE_INVITATION',
};

export const notificationTypeMapper = [
  null,
  NOTIFICATION_TYPES.fileShareInvitation,
];

const notificationPresenter = (notification) => {
  const { type } = notification;
  const mappedType = notificationTypeMapper[type] || null;
  if (mappedType === NOTIFICATION_TYPES.fileShareInvitation) {
    return ({
      ...notification,
      type: mappedType,
      createdAt: notification.createdAt / 1000 ** 3,
      relatedObject: {
        ...notification.relatedObject,
        status: notificationStatusMapper[notification.relatedObject.status],
      },
    });
  }

  return ({
    ...notification,
    type: mappedType,
  });
};

export default notificationPresenter;
