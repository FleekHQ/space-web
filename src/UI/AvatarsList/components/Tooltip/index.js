import React from 'react';
import PropTypes from 'prop-types';
import MuiTooltip from '@material-ui/core/Tooltip';
import Avatar from '../../../Avatar';
import Typography from '../../../Typography';
import useStyles from './styles';

const Tooltip = ({ usersList, children }) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      classes={{ tooltip: classes.root }}
      title={(
        <>
          {usersList.map((user) => (
            <div className={classes.row}>
              <Avatar
                imgUrl={user.imgUrl}
                username={user.username}
                size={14}
              />
              <Typography variant="body2" className={classes.typography}>
                {user.username}
              </Typography>
            </div>
          ))}
        </>
      )}
    >
      <div>
        {children}
      </div>
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    imgUrl: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
