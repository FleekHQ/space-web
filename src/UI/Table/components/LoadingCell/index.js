import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const LoadingCell = (props) => {
  const classes = useStyles();

  const { isLastCell, isIconCell } = props;
  const cellWidth = isLastCell ? '100%' : 'calc(100% - 25px)';
  const ANIMATION = 'wave';
  const VARIANT = 'rect';

  return (
    <>
      {isIconCell ? (
        <div className={classes.iconCellContainer}>
          <Skeleton
            width={23}
            height={23}
            className={classes.iconCell}
            animation={ANIMATION}
            variant={VARIANT}
          />
          <Skeleton
            width="calc(100% - 29px - 25px)"
            height={23}
            className={classes.cell}
            animation={ANIMATION}
            variant={VARIANT}
          />
        </div>
      ) : (
        <Skeleton
          width={cellWidth}
          height={23}
          animation={ANIMATION}
          variant={VARIANT}
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
