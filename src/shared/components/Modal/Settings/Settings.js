import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@terminal-packages/space-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/pro-regular-svg-icons/faTimesCircle';

import { signout } from '@events';

import useStyles from './styles';
import getContent from './get-content';

const Settings = ({
  closeModal,
  defaultItem,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const contentItems = getContent({
    t,
    closeModal,
    defaultItem,
  });

  const user = useSelector((state) => state.user);
  const dItem = contentItems.find((item) => item.default);
  const [contentId, setContentId] = useState(dItem.id);
  const selectedContentItem = contentItems.find((item) => item.id === contentId);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <div className={classes.bodyContainer}>
        <Box className={classes.sidebar}>
          <div className={classes.userContainer}>
            <Avatar imgUrl={user.avatarUrl} className={classes.userAvatar} />
            <div className={classes.usernameContainer}>
              <Typography variant="body1" component="div" noWrap>
                {user.displayName}
              </Typography>
              <Typography variant="body2" color="secondary">
                {t('common.edit')}
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Box component="ul" m={0} p={0} flex={1}>
            {contentItems.map((item) => (
              <li
                key={item.id}
                className={classnames(
                  classes.sidebarItem,
                  item.id === selectedContentItem.id && classes.selectedItem,
                )}
              >
                <ButtonBase onClick={() => setContentId(item.id)}>
                  <Typography
                    variant="body1"
                    color={item.id === selectedContentItem.id ? 'textSecondary' : 'secondary'}
                  >
                    {item.title}
                  </Typography>
                </ButtonBase>
              </li>
            ))}
          </Box>
          <Box pl="25px">
            <ButtonBase
              fullWidth
              onClick={() => dispatch(signout(user))}
            >
              <Box
                fontSize={14}
                color="#EF6A6E"
                component="span"
                fontFamily="Work Sans"
              >
                {t('account.menu.signout')}
              </Box>
            </ButtonBase>
          </Box>
        </Box>
        <div className={classes.content}>
          <div className={classes.contentHeader}>
            <Typography>
              {selectedContentItem.title}
            </Typography>
            <ButtonBase onClick={closeModal}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </ButtonBase>
          </div>
          <div className={classes.contentBody}>
            {selectedContentItem.content}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

Settings.defaultProps = {
  defaultItem: 'account',
};

Settings.propTypes = {
  defaultItem: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default Settings;
