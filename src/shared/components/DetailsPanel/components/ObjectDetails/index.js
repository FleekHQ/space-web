import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { formatDate, formatHour } from '@utils';
import useStyles from './styles';

const ObjectDetails = ({
  created,
  bytesSize,
  lastModified,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const formatTime = (date) => (
    `${formatDate(date)} ${t('common.at')} ${formatHour(date)}`
  );

  const dataSet = [
    {
      label: t('detailsPanel.objectDetails.size'),
      value: bytesSize,
    },
  ];

  if (created) {
    dataSet.push({
      label: t('detailsPanel.objectDetails.created'),
      value: formatTime(created),
    });
  }

  if (lastModified) {
    dataSet.push({
      label: t('detailsPanel.objectDetails.lastModified'),
      value: formatTime(lastModified),
    });
  }

  return (
    <div className={classes.root}>
      {dataSet.map((data) => (
        <div className={classes.dataRow} key={data.label}>
          <Typography variant="body2" color="secondary">
            {data.label}
          </Typography>
          <Typography variant="body2">
            {data.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

ObjectDetails.defaultProps = {
  created: null,
  lastModified: null,
};

ObjectDetails.propTypes = {
  created: PropTypes.instanceOf(Date),
  lastModified: PropTypes.instanceOf(Date),
  bytesSize: PropTypes.string.isRequired,
};

export default ObjectDetails;
