import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatBytes, getTabulations } from '@utils';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { TableCell, FileNameCell } from '@ui/Table';
import classnames from 'classnames';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const RenderRow = ({ row, arrowOnClick, disableOffset }) => {
  const location = useLocation();
  const classes = useStyles();

  const getSizeIcon = () => {
    if (row.isAvailableInSpace) {
      return (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={classnames(classes.checkIcon, {
              [classes.notAvailableLocally]: !row.isLocallyAvailable,
            })}
          />
        </div>
      );
    }
    return (
      <div className={classes.iconContainer}>
        <FontAwesomeIcon
          spin
          icon={faSpinnerThird}
          className={classes.loadingIcon}
        />
      </div>
    );
  };

  return (
    <>
      <FileNameCell
        ext={row.ext}
        src={`file:${row.key}`}
        arrowOnClick={arrowOnClick}
        expanded={row.expanded}
        tabulations={getTabulations(row.key, location)}
        name={row.name}
        selected={!!row.selected}
        isShared={row.members.length > 0}
      />
      <TableCell
        className={classes.iconSizeContainer}
        tabulations={disableOffset ? 0 : getTabulations(row.key, location)}
      >
        {getSizeIcon()}
        <Typography variant="body1" color="secondary" noWrap>
          {formatBytes(row.size)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {moment(row.lastModified).format('MMM D, YYYY')}
          {/* ^ just for testing, after POC should be used line below */}
          {/* {formatMonthDayYear(row.lastModified)} */}
        </Typography>
      </TableCell>
    </>
  );
};

RenderRow.defaultProps = {
  arrowOnClick: () => {},
  disableOffset: false,
};

RenderRow.propTypes = {
  row: PropTypes.shape({
    shareAmount: PropTypes.number,
    ext: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    isLocallyAvailable: PropTypes.bool,
    isAvailableInSpace: PropTypes.bool,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    members: PropTypes.array,
  }).isRequired,
  disableOffset: PropTypes.bool,
  arrowOnClick: PropTypes.func,
};

export default RenderRow;
