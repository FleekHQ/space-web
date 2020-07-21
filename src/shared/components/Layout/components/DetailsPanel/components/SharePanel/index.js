import React from 'react';
import electron from 'electron';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import { generateLink } from '@events';
import { SHARE_TYPES } from '@reducers/details-panel/share';
// TODO: use it when integration is ready
// import Typography from '@material-ui/core/Typography';
// import CollaboratorList from '../CollaboratorList';

import useStyles from './styles';

const handleCopyLink = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    type: SHARE_TYPES.ON_GENERATE_LINK,
  });
};

const SharePanel = (props) => {
  const {
    selectedObject,
    onInviteMembers,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const shareState = useSelector((state) => state.detailsPanel.share);

  React.useEffect(() => {
    if (shareState.generateLink.loading) {
      generateLink({
        filePath: selectedObject.key,
      });
    }
  }, [shareState.generateLink.loading]);

  React.useEffect(() => {
    let timer;
    if (shareState.generateLink.success) {
      electron.clipboard.writeText(shareState.generateLink.success.link);

      timer = setTimeout(() => {
        dispatch({
          type: SHARE_TYPES.ON_GENERATE_LINK_RESET,
        });
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [shareState.generateLink.success]);

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant="contained"
        onClick={onInviteMembers}
      >
        {t('detailsPanel.share.invite')}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        disabled={shareState.generateLink.loading || !!shareState.generateLink.success}
        onClick={handleCopyLink({ dispatch })}
      >
        {
          shareState.generateLink.loading && (
            <FontAwesomeIcon spin icon={faSpinner} />
          )
        }
        {shareState.generateLink.success && t('detailsPanel.share.copied')}
        {!shareState.generateLink.loading && !shareState.generateLink.success && t('detailsPanel.share.copy')}
      </Button>
      {/* <div className={classes.shareWidth}>
        <Typography variant="body1">
          {t('detailsPanel.share.with')}
        </Typography>
        <Typography component="a" variant="body1" color="textSecondary">
          {t('detailsPanel.share.manage')}
        </Typography>
      </div>
      <CollaboratorList t={t} /> */}
    </div>
  );
};

SharePanel.propTypes = {
  onInviteMembers: PropTypes.func.isRequired,
  selectedObject: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default SharePanel;
