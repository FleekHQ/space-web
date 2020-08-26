import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import useStyles from './styles';

const PasswordTooltip = (props) => {
  const {
    children,
    defaultOpen,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen);

  const content = (
    <div className={classes.content}>
      <FontAwesomeIcon
        icon={faInfoCircle}
        className={classes.icon}
      />
      <Typography
        variant="caption"
        weight="medium"
        color="inherit"
      >
        {t('modals.sharingModal.shareLink.tooltipContent')}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.button}
        >
          {t('modals.sharingModal.shareLink.tooltipButton')}
        </Button>
      </div>
    </div>
  );

  return (
    <ClickAwayListener
      onClickAway={() => setOpen(false)}
    >
      <Tooltip
        arrow
        open={open}
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        onClose={() => setOpen(false)}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={content}
        PopperProps={{
          disablePortal: true,
        }}
      >
        { children }
      </Tooltip>
    </ClickAwayListener>
  );
};

PasswordTooltip.defaultProps = {
  children: null,
  defaultOpen: true,
};

PasswordTooltip.propTypes = {
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
};

export default PasswordTooltip;
