import React from 'react';
import { shell } from 'electron';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MessageBox from '@ui/MessageBox';

const ProductKey = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default ProductKey;
