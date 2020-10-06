import React from 'react';
import { shell } from 'electron';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const SpaceProCard = ({
  username,
  activated,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.colorBorder}>
      <div className={classes.contentWrapper}>
        <img
          alt="Space logo mark"
          // eslint-disable-next-line max-len
          src="https://storage.googleapis.com/terminal-assets/images/space-logo-mark.svg"
          className={classes.logo}
        />
        <Box
          mt="11px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          {
            activated && (
              <Box
                mr="6px"
                fontSize="20px"
                color="#00cba9"
                display="inherit"
              >
                <FontAwesomeIcon icon={faCheckCircle} />
              </Box>
            )
          }
          <Typography>
            <Box component="span" fontWeight={600} fontSize="22px">
              {t(`modals.settings.productKey.form.${activated ? 'activated' : 'noactivated'}`)}
            </Box>
          </Typography>
        </Box>
        {
          !activated && (
            <>
              <Box mt="14px">
                <Typography className={classes.message}>
                  <Box fontWeight={600} fontSize="22px" component="span">
                    {formatter.format(11)}
                  </Box>
                  <Box fontWeight={500} fontSize="15px" component="span">
                    {t('modals.settings.productKey.form.price.per')}
                  </Box>
                </Typography>
              </Box>
              <Box mt="11px">
                <Typography className={classes.message}>
                  <Box fontSize="14px" component="span">
                    {t('modals.settings.productKey.form.price.usage')}
                  </Box>
                </Typography>
                <Typography className={classes.message}>
                  <Box color="#8f8f8f" fontSize="10px" component="span">
                    {t('modals.settings.productKey.form.price.extra')}
                  </Box>
                </Typography>
              </Box>
              <Box mt="19px">
                <Button
                  type="button"
                  variant="contained"
                  classes={{
                    root: classes.btnRoot,
                  }}
                  onClick={() => shell.openExternal(`https://square-truth-2906.on.fleek.co/#/checkout?username=${username}`)}
                >
                  {t('modals.settings.productKey.form.submit')}
                </Button>
              </Box>
            </>
          )
        }
      </div>
    </div>
  );
};

SpaceProCard.defaultProps = {
  activated: false,
};

SpaceProCard.propTypes = {
  activated: PropTypes.bool,
  username: PropTypes.string.isRequired,
};

export default SpaceProCard;
