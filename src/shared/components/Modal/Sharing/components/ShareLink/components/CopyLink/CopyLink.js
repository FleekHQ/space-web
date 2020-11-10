import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@terminal-packages/space-ui/core/Button';
import classnames from 'classnames';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const CopyLink = ({ url }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showChecked, setShowChecked] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const onClick = () => {
    copy(url);
    setShowChecked(true);

    clearTimeout(timerId);
    const timer = setTimeout(() => {
      setShowChecked(false);
      setTimerId(null);
    }, 3000);

    setTimerId(timer);
  };

  useEffect(() => () => {
    if (timerId) {
      clearTimeout(timerId);
    }
  }, []);

  return (
    <div className={classes.root}>
      <OutlinedInput
        value={url}
        variant="outlined"
        className={classes.input}
      />
      <Button
        onClick={onClick}
        variant="primary"
        className={classnames(classes.button, {
          [classes.checkedButton]: showChecked,
        })}
      >
        {showChecked ? (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              className={classes.iconCheck}
            />
            <Typography
              className={classes.copiedText}
            >
              {t('modals.sharingModal.shareLink.copyLink')}
            </Typography>
          </>
        ) : (
          t('modals.sharingModal.shareLink.copyLink')
        )}
      </Button>
    </div>
  );
};

CopyLink.defaultProps = {
  url: null,
};

CopyLink.propTypes = {
  url: PropTypes.string,
};

export default CopyLink;
