import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Avatar from '@ui/Avatar';
import Button from '@material-ui/core/Button';
import FileIcon from '@ui/FileIcon';
import useStyles from './styles';

const ShareBox = ({
  user,
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
        <Avatar
          username={user.username || ' '}
          imgUrl={user.imgUrl}
          size={23}
          className={classes.avatar}
        />
        <Typography noWrap weight="medium" className={classes.username}>
          {user.username}
        </Typography>
      </div>
      <div className={classes.divider} />
      <div className={classes.content}>
        <Typography variant="caption" color="secondary">
          {i18n.subtitle}
        </Typography>
        <div className={classes.objectsList}>
          {objectsList.map((obj) => (
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
          ))}
        </div>
        {showViewAllBtn && (
          <Button
            color="primary"
            onClick={onViewAllClick}
            fullWidth
            disableRipple
            className={classes.viewAllBtn}
          >
            {i18n.viewAll}
          </Button>
        )}
      </div>
    </div>
  );
};

ShareBox.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    username: PropTypes.string,
    publicKey: PropTypes.string,
  }).isRequired,
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
