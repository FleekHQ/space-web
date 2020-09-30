import React, { useState } from 'react';
import { shell } from 'electron';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MessageBox from '@ui/MessageBox';

import useStyles from './styles';

const ProductKey = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState('');
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    if (key) {
      // eslint-disable-next-line no-console
      console.log(key);
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
          <Button disabled={!key} variant="contained">
            {t('modals.settings.productKey.form.submit')}
          </Button>
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
          <Button variant="contained" onClick={() => shell.openExternal('https://space.storage')}>
            {t('modals.settings.productKey.messageBox.buy')}
          </Button>
        </MessageBox>
      </Box>
    </>
  );
};

export default ProductKey;
