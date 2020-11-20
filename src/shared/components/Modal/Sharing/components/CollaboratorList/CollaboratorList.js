import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import classnames from 'classnames';
import Button from '@terminal-packages/space-ui/core/Button';

import useStyles from './styles';
import Collaborator from '../../../../Collaborator';
import PermissionsDropdown from '../../../../PermissionsDropdown';

const DATA_REF = 'permissions-dropdown';

const CollaboratorList = (props) => {
  const {
    i18n,
    onShare,
    options,
    loading,
    className,
    collaborators,
    onChangePermissions,
    hasUsers,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState({
    status: false,
    collaboratorId: null,
  });

  const collaboratorsList = collaborators.map((collaborator) => {
    const {
      id,
      isOwner,
      permissionsId,
      ...collaboratorProps
    } = collaborator;

    const isOpen = open.status && open.collaboratorId === id;

    const handleToggle = () => {
      if (open.status && open.collaboratorId !== id) {
        setOpen({ ...open, collaboratorId: id });
      } else {
        setOpen({ collaboratorId: id, status: !open.status });
      }
    };

    const handleClose = (e) => {
      const isTargetPermissions = e.path.some((element) => {
        const dataRef = element.getAttribute && element.getAttribute('data-ref');

        return dataRef === DATA_REF;
      });

      if (!isTargetPermissions) setOpen({ ...open, status: false });
    };

    const onChange = (e, option) => {
      setOpen({ ...open, status: false });
      onChangePermissions(option, collaborator);
    };

    const collaboratorOptions = options.map((opt) => ({
      ...opt,
      selected: opt.id === permissionsId,
    }));

    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <div key={id} className={classes.row}>
        <Collaborator {...collaboratorProps} />
        {isOwner ? (
          <Typography variant="body2" className={classes.ownerLabel}>
            {i18n.owner}
          </Typography>
        ) : (
          <PermissionsDropdown
            open={isOpen}
            onChange={onChange}
            handleClose={handleClose}
            handleToggle={handleToggle}
            options={collaboratorOptions}
            data-ref={DATA_REF}
            disableBorder
            disabled
          />
        )}
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
};
CollaboratorList.propTypes = {
  className: PropTypes.string,
  onChangePermissions: PropTypes.func,
  loading: PropTypes.bool,
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
