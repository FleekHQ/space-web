import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import AvatarsList from '@ui/AvatarsList';
import useStyles from './styles';

export { default as ShareBoxSkeleton } from './Skeleton';

const ShareBox = ({
  usersList,
  i18n,
  objectsList,
  onViewAllClick,
  onObjectClick,
  showViewAllBtn,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <AvatarsList usersList={usersList} />
      </div>
      <div className={classes.divider} />
      <div className={classes.content}>
        <Typography variant="caption" color="secondary">
          {i18n.subtitle}
        </Typography>
        <div className={classes.objectsList}>
          {objectsList.length ? objectsList.map((obj) => (
            <Button
              key={obj.name}
              disableRipple
              className={classes.objectItem}
              onClick={() => onObjectClick(obj)}
            >
              <span className={classes.iconWrapper}>
                <FileIcon
                  src={`file:${obj.key}`}
                  ext={obj.ext}
                />
              </span>
              <Typography noWrap>{obj.name}</Typography>
            </Button>
          )) : (
            Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} width="100%">
                <Button className={classes.objectItem}>
                  <span className={classes.iconWrapper}>
                    <FileIcon ext="default" />
                  </span>
                </Button>
              </Skeleton>
            ))
          )}
        </div>
        {(showViewAllBtn || !objectsList.length) && (
          <Skeleton style={{ margin: 'auto' }}>
            <Button
              color="primary"
              onClick={onViewAllClick}
              fullWidth
              disableRipple
              className={classes.viewAllBtn}
              disabled={!objectsList.length}
            >
              {i18n.viewAll}
            </Button>
          </Skeleton>
        )}
      </div>
    </div>
  );
};

ShareBox.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    imgUrl: PropTypes.string,
    username: PropTypes.string,
    publicKey: PropTypes.string,
  })).isRequired,
  i18n: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    viewAll: PropTypes.string.isRequired,
  }).isRequired,
  objectsList: PropTypes.arrayOf(PropTypes.shape({
    ext: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onViewAllClick: PropTypes.func.isRequired,
  onObjectClick: PropTypes.func.isRequired,
  showViewAllBtn: PropTypes.bool.isRequired,
};

export default ShareBox;
