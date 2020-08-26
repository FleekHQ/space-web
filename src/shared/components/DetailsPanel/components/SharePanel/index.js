import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getIdentitiesByAddress } from '@events';

import CollaboratorList from '../CollaboratorList';

import useStyles from './styles';

const SharePanel = (props) => {
  const {
    members,
    onShare,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const state = useSelector((s) => s.identities);

  React.useEffect(() => {
    const addresses = members.slice(1).reduce((addrs, member) => {
      if (!state.identities[member.publicKey]) {
        return addrs.concat(member.address);
      }

      return addrs;
    }, []);

    if (addresses.length > 0) {
      getIdentitiesByAddress({ addresses });
    }
  }, []);

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant="contained"
        onClick={onShare}
      >
        {t('detailsPanel.share.share')}
      </Button>
      <div className={classes.shareWidth}>
        <Typography variant="body1">
          {t('detailsPanel.share.with')}
        </Typography>
        <Typography component="a" variant="body1" color="textSecondary">
          {t('detailsPanel.share.manage')}
        </Typography>
      </div>
      <CollaboratorList
        t={t}
        collaborators={members.map((member) => {
          if (state.identities[member.publicKey]) {
            return {
              ...member,
              ...state.identities[member.publicKey],
            };
          }
          return member;
        })}
      />
    </div>
  );
};

SharePanel.defaultProps = {
  members: [],
};

SharePanel.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
  }).isRequired),
  onShare: PropTypes.func.isRequired,
};

export default SharePanel;
