import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';
import classnames from 'classnames';
import moment from 'moment';
import Button from '@terminal-packages/space-ui/core/Button';

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
    highlighted,
    imgUrl,
  } = props;

  const FILE_STACK_MAX = 5;

  const classes = useStyles({
    stackedItems: Math.min(files.length, FILE_STACK_MAX),
  });

  const getButtons = () => {
    switch (status) {
      case 'PENDING':
        return (
          <>
            <Button
              onClick={onAccept}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {i18n.accept}
            </Button>
            <Button
              onClick={onReject}
              variant="dangerOutlined"
              className={classes.button}
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
        {
          [classes.highlighted]: highlighted,
        },
        className,
      )}
    >
      <Avatar
        imgUrl={imgUrl}
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
        <div className={classes.filesContainer}>
          <div className={classes.filesStack}>
            {files.slice(0, FILE_STACK_MAX).map((_, index) => (
              <FileCard
                key={index}
                stackPosition={index}
                ext={files[0].ext}
                name={files[0].name}
              />
            ))}
          </div>
        </div>
        <Typography variant="body2" color="secondary" className={classes.timestamp}>
          {moment.unix(timestamp).fromNow()}
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
  highlighted: false,
  imgUrl: null,
};

NotificationItem.propTypes = {
  username: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.element,
  timestamp: PropTypes.number,
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
  highlighted: PropTypes.bool,
  imgUrl: PropTypes.string,
};

export default NotificationItem;
