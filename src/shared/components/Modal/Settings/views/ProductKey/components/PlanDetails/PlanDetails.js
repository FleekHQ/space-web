import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BalanceBox from '@terminal-packages/space-ui/core/BalanceBox';
import { faUsdCircle } from '@fortawesome/pro-solid-svg-icons/faUsdCircle';

import useStyles from './styles';
import { BaseCard } from '../../../../components';

/* eslint-disable react/jsx-props-no-spreading */
const PlanDetails = (props) => {
  const {
    plan,
    price,
    amount,
    billDate,
    severity,
    paymentType,
    onAddFounds,
    onChangePlan,
    timeRemaining,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const transBoldOptions = {
    components: { bold: <Box fontWeight={600} component="span" /> },
  };

  Trans.defaultProps = {
    components: { bold: <Box fontWeight={600} component="span" /> },
  };

  return (
    <BaseCard className={classes.root}>
      <div className={classes.leftSection}>
        <Typography variant="body1">
          <FontAwesomeIcon
            icon={faUsdCircle}
            className={classes.icon}
          />
          <Box fontWeight={600} component="span">
            <Trans i18nKey="modals.settings.productKey.planDetails.title" />
          </Box>
        </Typography>
        {plan && (
          <Typography variant="body1">
            <Trans
              i18nKey="modals.settings.productKey.planDetails.currentPlan"
              values={{ plan }}
              {...transBoldOptions}
            />
          </Typography>
        )}
        {paymentType && (
          <div className={classes.paymentType}>
            <Typography vairant="body1">
              <Trans
                i18nKey="modals.settings.productKey.planDetails.paymentType"
                values={{ paymentType: t(`common.${paymentType}`) }}
                {...transBoldOptions}
              />
            </Typography>
            <ButtonBase onClick={onChangePlan}>
              <Typography vairant="body1" color="inherit">
                <Trans i18nKey="common.change" />
              </Typography>
            </ButtonBase>
          </div>
        )}
        {billDate && price && (
          <Typography variant="body1">
            <Trans
              i18nKey="modals.settings.productKey.planDetails.nextBill"
              values={{ billDate, price }}
              {...transBoldOptions}
            />
          </Typography>
        )}
      </div>
      {paymentType === 'crypto' && (
        <div>
          <BalanceBox
            amount={amount}
            borderless={false}
            severity={severity}
            onAddFunds={onAddFounds}
            timeRemaining={timeRemaining}
            i18n={t('modals.settings.productKey.planDetails.balanceBox', { returnObjects: true })}
            tooltipMessage={t('modals.settings.productKey.planDetails.balanceBox.tooltipMessage', { timeRemaining })}
          />
        </div>
      )}
    </BaseCard>
  );
};

PlanDetails.defaultProps = {
  plan: '',
  price: '',
  amount: 0,
  billDate: '',
  timeRemaining: '',
  paymentType: null,
  severity: 'success',
  onAddFounds: () => {},
};

PlanDetails.propTypes = {
  plan: PropTypes.string,
  price: PropTypes.string,
  amount: PropTypes.number,
  billDate: PropTypes.string,
  onAddFounds: PropTypes.func,
  timeRemaining: PropTypes.string,
  onChangePlan: PropTypes.func.isRequired,
  paymentType: PropTypes.oneOf(['crypto', 'card']),
  severity: PropTypes.oneOf(['danger', 'success', 'warning']),
};

export default PlanDetails;
