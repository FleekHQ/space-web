import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const LoadingCell = (props) => {
  const classes = useStyles();

  const { isLastCell, isIconCell } = props;
  const cellWidth = isLastCell ? '100%' : 'calc(100% - 25px)';

  return (
    <>
      {isIconCell ? (
        <div className={classes.iconCellContainer}>
          <Skeleton
            width={23}
            height={23}
            className={classes.iconCell}
            animation="wave"
            variant="rect"
          />
          <Skeleton
            width="calc(100% - 29px - 25px)"
            height={23}
            className={classes.cell}
            animation="wave"
            variant="rect"
          />
        </div>
      ) : (
        <Skeleton
          width={cellWidth}
          height={23}
          animation="wave"
          variant="rect"
        />
      )}
    </>
  );
};

LoadingCell.defaultProps = {
  isLastCell: false,
  isIconCell: false,
};

LoadingCell.propTypes = {
  isLastCell: PropTypes.bool,
  isIconCell: PropTypes.bool,
};

export default LoadingCell;
