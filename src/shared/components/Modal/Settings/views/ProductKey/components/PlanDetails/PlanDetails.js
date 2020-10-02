import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsdCircle } from '@fortawesome/pro-solid-svg-icons/faUsdCircle';

import useStyles from './styles';
import { BaseCard } from '../../../../components';

/* eslint-disable react/jsx-props-no-spreading */
const PlanDetails = (props) => {
  const {
    plan,
    price,
    billDate,
    paymentType,
  } = props;

  const classes = useStyles();

  const transBoldOptions = {
    components: { bold: <Box fontWeight={600} component="span" /> },
  };

  Trans.defaultProps = {
    components: { bold: <Box fontWeight={600} component="span" /> },
  };

  return (
    <BaseCard className={classes.root}>
      <Typography variant="body1">
        <FontAwesomeIcon
          icon={faUsdCircle}
          className={classes.icon}
        />
        <Box fontWeight={600} component="span">
          <Trans i18nKey="modals.settings.productKey.planDetails.title" />
        </Box>
      </Typography>
      <Typography variant="body1">
        <Trans
          i18nKey="modals.settings.productKey.planDetails.currentPlan"
          values={{ plan }}
          {...transBoldOptions}
        />
      </Typography>
      <Typography vairant="body1">
        <Trans
          i18nKey="modals.settings.productKey.planDetails.paymentType"
          values={{ paymentType }}
          {...transBoldOptions}
        />
      </Typography>
      <Typography variant="body1">
        <Trans
          i18nKey="modals.settings.productKey.planDetails.nextBill"
          values={{ billDate, price }}
          {...transBoldOptions}
        />
      </Typography>
    </BaseCard>
  );
};

PlanDetails.defaultProps = {
  plan: '',
  price: '',
  billDate: '',
  paymentType: '',
};

PlanDetails.propTypes = {
  plan: PropTypes.string,
  price: PropTypes.string,
  billDate: PropTypes.string,
  paymentType: PropTypes.string,
};

export default PlanDetails;
