import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import Typography from '@ui/Typography';
import Badge from '@material-ui/core/Badge';

import useStyles from './styles';

const FileCard = (props) => {
  const {
    ext,
    name,
    showBadge,
    badgeNumber,
    badgeTooltip,
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Badge
          invisible={!showBadge}
          badgeContent={(
            <Typography className={classes.badgeContent} title={badgeTooltip}>
              {badgeNumber}
            </Typography>
          )}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          classes={{
            root: classes.badgeRoot,
            badge: classes.badge,
          }}
        >
          <div className={classes.iconContainer}>
            <FileIcon ext={ext} />
          </div>
          <Typography noWrap variant="body2">
            { name }
          </Typography>
        </Badge>
      </div>
    </div>
  );
};

FileCard.defaultProps = {
  showBadge: false,
  badgeNumber: 0,
  badgeTooltip: '',
};

FileCard.propTypes = {
  ext: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showBadge: PropTypes.bool,
  badgeNumber: PropTypes.number,
  badgeTooltip: PropTypes.string,
};

export default FileCard;
