import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag';
import MessageBox from '@ui/MessageBox';

import AddFundsBox from './components/AddFundsBox';
import SpaceProCard from './components/SpaceProCard';

const ProductKey = () => {
  const { t } = useTranslation();
  const { user, productKey } = useSelector((s) => ({
    user: s.user,
    productKey: s.settings.productKey,
  }));

  return (
    <>
      <Box mb="15px">
        <AddFundsBox
          severity="danger"
          message="Balance is dangerously low. Refill now to avoid losing files."
          tooltipMessage="If you don't add funds to your balance to cover your next monthly bill, your files will be removed from Space 14 days after your next billing date. Please add funds now to avoid any disruption in service and potentially losing your files."
          onAddFunds={() => null}
        />
      </Box>
      <SpaceProCard
        activated={false}
        username={user.username}
      />
      {
        productKey.planInfo ? <span>Plan Info</span> : (
          <MessageBox
            bgColor="secondary"
            icon={faShoppingBag}
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
            <Button
              variant="contained"
              onClick={() => {
                window
                  .open(`https://square-truth-2906.on.fleek.co/#/checkout?username=${user.username}`, '_blank')
                  .focus();
              }}
            >
              {t('modals.settings.productKey.messageBox.buy')}
            </Button>
          </MessageBox>
        )
      }
    </>
  );
};

export default ProductKey;
