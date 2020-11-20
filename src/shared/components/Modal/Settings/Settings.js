import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import getContent from './get-content';

const Settings = ({
  closeModal,
  defaultItem,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const contentItems = getContent({
    t,
    closeModal,
    defaultItem,
  });
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
      <div className={classes.titleContainer}>
        <Typography variant="h6" weight="medium">
          {t('modals.settings.title')}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.closeIcon}
          />
        </ButtonBase>
      </div>
      <div className={classes.bodyContainer}>
        <ul className={classes.sidebar}>
          {contentItems.map((item) => (
            <li key={item.id}>
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
        </ul>
        <div className={classes.content}>
          {selectedContentItem.content}
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
