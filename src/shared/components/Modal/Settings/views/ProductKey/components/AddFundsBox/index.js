import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import SeverityBox from '@terminal-packages/space-ui/core/SeverityBox';

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    padding: '6px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.palette.blue1,
  },
  iconBtnRoot: {
    padding: 0,
    fontSize: 13,
    color: theme.palette.common.black,
  },
  popperRoot: {
    borderRadius: 4,
    boxShadow: '0 0 6px 0 rgba(219, 225, 237, 0.7)',
  },
  tooltipRoot: {
    margin: '3px 0 0 0',
    width: 197,
    padding: '10px 11px 7px 12px',
    backgroundColor: theme.palette.common.white,
  },
}));

const AddFundsBox = ({
  message,
  severity,
  tooltipMessage,
  onAddFunds,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <SeverityBox severity={severity}>
      <Box
        display="flex"
        padding="4px 15px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" display="inherit">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <Box mx="3px">
            <Typography>
              {message}
            </Typography>
          </Box>
          {
            tooltipMessage && tooltipMessage.length > 0 && (
              <Tooltip
                placement="bottom-end"
                classes={{
                  popper: classes.popperRoot,
                  tooltip: classes.tooltipRoot,
                }}
                title={<Typography>{tooltipMessage}</Typography>}
              >
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="balance-info"
                  classes={{
                    root: classes.iconBtnRoot,
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </IconButton>
              </Tooltip>
            )
          }
        </Box>
        <Button
          variant="contained"
          onClick={onAddFunds}
          classes={{
            root: classes.btnRoot,
          }}
        >
          {t('modals.settings.productKey.addFunds')}
        </Button>
      </Box>
    </SeverityBox>
  );
};

AddFundsBox.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
  onAddFunds: PropTypes.func.isRequired,
};

export default AddFundsBox;
