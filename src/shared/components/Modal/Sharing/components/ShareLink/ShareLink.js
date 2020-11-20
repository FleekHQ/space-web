import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './styles';
import getContent from './get-content';

const ShareLink = (props) => {
  const {
    url,
    step,
    onSave,
    onReset,
    loading,
    onCancel,
    onCreateLink,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const content = getContent({
    url,
    step,
    onSave,
    loading,
    onReset,
    onCancel,
    onCreateLink,
  });

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="body1" weight="medium">
          {t('modals.sharingModal.shareLink.title')}
        </Typography>
        {step === 2 && (
          <ButtonBase onClick={onReset}>
            <Typography variant="body2" weight="medium" color="textSecondary">
              {t('modals.sharingModal.shareLink.resetLink')}
            </Typography>
          </ButtonBase>
        )}
      </div>
      <div className={classes.content}>
        { content }
      </div>
    </div>
  );
};

ShareLink.defaultProps = {
  url: null,
  loading: false,
};

ShareLink.propTypes = {
  url: PropTypes.string,
  loading: PropTypes.bool,
  step: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreateLink: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ShareLink;
