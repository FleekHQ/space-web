import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';

import useStyles from './styles';

const defaultAccountData = {
  id: '',
  name: '',
  membersNumber: 0,
};

const TeamSelector = ({ accountsList, selectedAccountId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const selectedAccountDetails = accountsList.find(
    option => option.id === selectedAccountId,
  ) || defaultAccountData;

  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        <Avatar
          id={selectedAccountDetails.id}
          imgUrl={selectedAccountDetails.photoUrl}
        />
      </div>
      <div className={classes.textWrapper}>
        <Typography
          weight="medium"
          variant="body1"
          className={classes.teamName}
          noWrap
        >
          {selectedAccountDetails.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {t('teamSelector.membersNumber', {
            count: selectedAccountDetails.membersNumber,
          })}
        </Typography>
      </div>
    </div>
  )
};

TeamSelector.propTypes = {
  accountsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    membersNumber: PropTypes.number.isRequired,
    photoUrl: PropTypes.string,
  })),
  selectedAccountId: PropTypes.string.isRequired,
}

export default TeamSelector;
