import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';
import classnames from 'classnames';
import moment from 'moment';
import Button from '@material-ui/core/Button';

import useStyles from './styles';
import { FileCard } from './components';

/* eslint-disable react/no-array-index-key */
const NotificationItem = (props) => {
  const {
    i18n,
    files,
    username,
    className,
    timestamp,
    description,
    onAccept,
    onReject,
    status,
  } = props;

  const classes = useStyles();

  const getButtons = () => {
    switch (status) {
      case 'PENDING':
        return (
          <>
            <Button
              onClick={onAccept}
              variant="contained"
              className={classes.button}
            >
              {i18n.accept}
            </Button>
            <Button
              onClick={onReject}
              variant="outlined"
              className={classnames(
                classes.button,
                classes.rejectButton,
              )}
            >
              {i18n.reject}
            </Button>
          </>
        );
      case 'ACCEPTED':
        return (
          <Typography className={classnames(classes.statusChip, classes.accepted)}>
            {i18n.accepted}
          </Typography>
        );
      case 'REJECTED':
      default:
        return (
          <Typography className={classnames(classes.statusChip, classes.rejected)}>
            {i18n.rejected}
          </Typography>
        );
    }
  };

  return (
    <MenuItem
      disableRipple
      className={classnames(
        classes.root,
        className,
      )}
    >
      <Avatar
        username={username}
        size={32}
      />
      <div className={classes.content}>
        <Typography variant="body2">
          <strong>{username}</strong>
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
        <div className={classes.files}>
          {files.map((file, index) => (
            <FileCard
              key={index}
              ext={file.ext}
              name={file.name}
            />
          ))}
        </div>
        <Typography variant="body2" color="secondary">
          {moment(timestamp).fromNow()}
        </Typography>
        <div className={classes.buttonContainer}>
          {getButtons()}
        </div>
      </div>
    </MenuItem>
  );
};

NotificationItem.defaultProps = {
  username: '',
  description: '',
  className: null,
  files: [],
  timestamp: '',
  onAccept: () => {},
  onReject: () => {},
  status: 'PENDING',
};

NotificationItem.propTypes = {
  username: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  timestamp: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  files: PropTypes.arrayOf(PropTypes.shape({
    ext: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  i18n: PropTypes.shape({
    accept: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    accepted: PropTypes.string.isRequired,
    rejected: PropTypes.string.isRequired,
  }).isRequired,
  status: PropTypes.string,
};

export default NotificationItem;
