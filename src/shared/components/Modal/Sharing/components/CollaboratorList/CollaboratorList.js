import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import Button from '@terminal-packages/space-ui/core/Button';

import useStyles from './styles';
import Collaborator from '../../../../Collaborator';

const CollaboratorList = (props) => {
  const {
    i18n,
    onShare,
    loading,
    className,
    collaborators,
    hasUsers,
    onRemoveSelectedIdentity,
  } = props;

  const classes = useStyles();

  const collaboratorsList = collaborators.map((collaborator) => {
    const {
      id,
      isOwner,
      permissionsId,
      deletable = true,
      ...collaboratorProps
    } = collaborator;

    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <div key={id} className={classes.row}>
        <Collaborator {...collaboratorProps} />
        {isOwner ? (
          <Typography variant="body2" className={classes.ownerLabel}>
            {i18n.owner}
          </Typography>
        ) : (deletable && (
          <IconButton
            className={classes.removeBtn}
            onClick={() => onRemoveSelectedIdentity(collaborator)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        ))}
      </div>
    );
  });

  return (
    <div>
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        {collaboratorsList}
      </div>
      <div className={classes.shareButtonContainer}>
        <Button
          onClick={onShare}
          variant="primary"
          disabled={loading || !hasUsers}
          className={classes.shareButton}
        >
          {i18n.shareButton}
        </Button>
      </div>
    </div>
  );
};

CollaboratorList.defaultProps = {
  options: [],
  className: null,
  collaborators: [],
  onChangePermissions: () => {},
  onShare: () => {},
  loading: false,
  onRemoveSelectedIdentity: () => null,
};
CollaboratorList.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  onChangePermissions: PropTypes.func,
  onRemoveSelectedIdentity: PropTypes.func,
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
  options: PropTypes.arrayOf(PropTypes.shape({
    danger: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  i18n: PropTypes.shape({
    owner: PropTypes.string,
    shareButton: PropTypes.string,
  }).isRequired,
  onShare: PropTypes.func,
  hasUsers: PropTypes.bool.isRequired,
};

export default CollaboratorList;
