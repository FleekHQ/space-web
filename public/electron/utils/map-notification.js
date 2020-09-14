const { InvitationStatus, NotificationType } = require('@fleekhq/space-client/dist/definitions/space_pb');
const swapKeyValue = require('./swap-key-value');

const invitationStatusByIndex = swapKeyValue(InvitationStatus);
const notificationTypeByIndex = swapKeyValue(NotificationType);

const mapNotification = (notification) => {
  const relatedObject = notification.getRelatedobjectCase();
  const invitationValue = notification.getInvitationvalue();
  const usageAlert = notification.getUsagealert();
  const invitationAccept = notification.getInvitationaccept();

  return ({
    id: notification.getId(),
    subject: notification.getSubject(),
    body: notification.getBody(),
    type: notificationTypeByIndex[notification.getType()],
    createdAt: notification.getCreatedat(),
    readAt: notification.getReadat(),
    relatedObject: notification.getRelatedobjectCase(),
    ...(relatedObject === 4 && {
      invitationValue: {
        itemPaths: invitationValue.getItempathsList().map((itemPath) => ({
          dbId: itemPath.getDbid(),
          bucket: itemPath.getBucket(),
          path: itemPath.getPath(),
        })),
        inviterPublicKey: invitationValue.getInviterpublickey(),
        invitationID: invitationValue.getInvitationid(),
        status: invitationStatusByIndex[invitationValue.getStatus()],
      },
    }),
    ...(relatedObject === 5 && {
      usageAlert: {
        used: usageAlert.getUsed(),
        limit: usageAlert.getLimit(),
        message: usageAlert.getMessage(),
      },
    }),
    ...(relatedObject === 6 && {
      invitationAccept: {
        invitationID: invitationAccept.getInvitationid(),
      },
    }),
  });
};

module.exports = mapNotification;
