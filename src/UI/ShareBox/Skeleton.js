import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import useStyles from './styles';

const ShareBoxSkeleton = ({ i18n }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Skeleton
          variant="circle"
          width={23}
          height={23}
          style={{ flexShrink: 0 }}
        />
        <Skeleton width="100%" style={{ flexGrow: 1, marginLeft: 5 }}>
          <Typography className={classes.username}>.</Typography>
        </Skeleton>
      </div>
      <div className={classes.divider} />
      <div className={classes.content}>
        <Typography variant="caption" color="secondary">
          {i18n.subtitle}
        </Typography>
        <div className={classes.objectsList}>
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} width="100%">
              <Button className={classes.objectItem}>
                <span className={classes.iconWrapper}>
                  <FileIcon ext="default" />
                </span>
              </Button>
            </Skeleton>
          ))}
        </div>
        <Skeleton style={{ margin: 'auto' }}>
          <Button
            fullWidth
            className={classes.viewAllBtn}
          >
            {i18n.viewAll}
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};

ShareBoxSkeleton.propTypes = {
  i18n: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    viewAll: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareBoxSkeleton;
