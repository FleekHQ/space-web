import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatBytes } from '@utils';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { TableCell, FileNameCell } from '@ui/Table';
import classnames from 'classnames';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const RenderRow = ({ row, arrowOnClick }) => {
  const location = useLocation();
  const classes = useStyles({ progress: 0.4 });
  const { t } = useTranslation();

  const getTabulationAmount = () => {
    const locationWithRoot = location.pathname.split('/').filter((folder) => folder !== '');
    const locationWithoutRoot = locationWithRoot.slice(2, locationWithRoot.length);
    const rootFolderAmount = locationWithoutRoot.length;
    const { key = '' } = row;
    const currentItemFolderAmount = key.split('/').length;
    const tabulations = currentItemFolderAmount - rootFolderAmount - 1;

    return tabulations;
  };

  const getSizeIcon = () => {
    if (row.isUploading) {
      if (row.error) {
        return (
          <div className={classes.iconContainer}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={classes.errorIcon}
            />
          </div>
        );
      }
      return (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            spin
            icon={faSpinnerThird}
            className={classes.uploadingIcon}
          />
        </div>
      );
    }
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

  const getLastModifiedCell = () => {
    if (row.isUploading) {
      if (row.error) {
        return (
          <Typography className={classes.errorText}>
            {t('modules.storage.fileTable.uploadFailed')}
          </Typography>
        );
      }
      return (
        <div className={classes.progressBar} />
      );
    }
    return (
      <Typography variant="body1" color="secondary" noWrap>
        {moment(row.lastModified).format('MMM D, YYYY')}
        {/* ^ just for testing, after POC should be used line below */}
        {/* {formatMonthDayYear(row.lastModified)} */}
      </Typography>
    );
  };

  return (
    <>
      <FileNameCell
        ext={row.ext}
        src={`file:${row.key}`}
        arrowOnClick={arrowOnClick}
        expanded={row.expanded}
        tabulations={getTabulationAmount()}
        name={row.name}
        selected={!!row.selected}
        isShared={row.members.length > 0}
        isUploading={row.isUploading}
      />
      <TableCell
        className={classes.iconSizeContainer}
      >
        {getSizeIcon()}
        <Typography
          variant="body1"
          color="secondary"
          noWrap
          className={classnames({
            [classes.uploading]: row.isUploading,
          })}
        >
          {formatBytes(row.size)}
        </Typography>
      </TableCell>
      <TableCell>
        {getLastModifiedCell()}
      </TableCell>
    </>
  );
};

RenderRow.defaultProps = {
  arrowOnClick: () => {},
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
    isUploading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
  arrowOnClick: PropTypes.func,
};

export default RenderRow;
