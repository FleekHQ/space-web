import React, { useState } from 'react';
import { shell } from 'electron';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MessageBox from '@ui/MessageBox';
import ErrorCard from '@ui/ErrorCard';
import { claimWallet } from '@events';

import useStyles from './styles';

const ProductKey = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState('');
  const classes = useStyles();
  const { user, productKey } = useSelector((s) => ({
    user: s.user,
    productKey: s.settings.productKey,
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (key) {
      claimWallet(key);
    }
  };

  return (
    <>
      <div className={classes.colorBorder}>
        <form className={classes.contentWrapper} onSubmit={onSubmit}>
          <img
            alt="Space logo mark"
            // eslint-disable-next-line max-len
            src="https://storage.googleapis.com/terminal-assets/images/space-logo-mark.svg"
            className={classes.logo}
          />
          <Typography className={classes.title}>
            {t('modals.settings.productKey.form.title')}
          </Typography>
          <Typography className={classes.message}>
            {t('modals.settings.productKey.form.message')}
          </Typography>
          <Box m="16px 0 8px">
            <TextField
              label={t('modals.settings.productKey.form.inputLabel')}
              variant="outlined"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              fullWidth
            />
          </Box>
          {
            !productKey.success && (
              <Button type="submit" disabled={!key || productKey.loading} variant="contained">
                {t('modals.settings.productKey.form.submit')}
              </Button>
            )
          }
          {
            productKey.error && (
              <Box mt={2}>
                <ErrorCard message={productKey.error} />
              </Box>
            )
          }
        </form>
      </div>
      <Box>
        <MessageBox
          type="shopping"
          bgColor="secondary"
          title={(
            <Typography>
              <Box component="span" fontWeight={600}>
                {t('modals.settings.productKey.messageBox.title')}
              </Box>
            </Typography>
          )}
        >
          <Box mb="11px">
            <Typography>
              {t('modals.settings.productKey.messageBox.description')}
            </Typography>
          </Box>
          {/* TODO: change to real space billing url */}
          <Button variant="contained" onClick={() => shell.openExternal(`https://square-truth-2906.on.fleek.co/#/checkout?username=${user.username}`)}>
            {t('modals.settings.productKey.messageBox.buy')}
          </Button>
        </MessageBox>
      </Box>
    </>
  );
};

export default ProductKey;
