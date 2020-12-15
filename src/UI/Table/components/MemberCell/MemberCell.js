import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import TableCell from '../TableCell';
import Avatar from '../../../Avatar';

const MemberCell = (props) => {
  const {
    username,
    avatarUrl,
    ...tableCellProps
  } = props;

  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableCell {...tableCellProps}>
      <div className={classes.container}>
        <Avatar
          imgUrl={avatarUrl}
          size={17}
        />
        <Typography color="inherit" noWrap>
          {username}
        </Typography>
      </div>
    </TableCell>
  );
};

MemberCell.defaultProps = {
  username: '',
  avatarUrl: null,
};

MemberCell.propTypes = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default MemberCell;
