import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { formatDate, formatHour } from '@utils';
import useStyles from './styles';

const ObjectDetails = ({ bytesSize, created, lastModified }) => {
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
    {
      label: t('detailsPanel.objectDetails.created'),
      value: formatTime(created),
    },
    {
      label: t('detailsPanel.objectDetails.lastModified'),
      value: formatTime(lastModified),
    },
  ];


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

ObjectDetails.propTypes = {
  bytesSize: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  lastModified: PropTypes.instanceOf(Date).isRequired,
};

export default ObjectDetails;
