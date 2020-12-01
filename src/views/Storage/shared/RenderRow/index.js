import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatBytes } from '@utils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { TableCell, FileNameCell, IconsCell } from '@ui/Table';
import { openModal, LICENSE_REGISTRATION } from '@shared/components/Modal/actions';
import classnames from 'classnames';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons/faSpinnerThird';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const RenderRow = ({ row, arrowOnClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const shareAmount = row.shareAmount - 1;
  const iconsCellI18n = {
    warning: t('modules.storage.fileTable.storageLimitReached.warning'),
    description: t('modules.storage.fileTable.storageLimitReached.description'),
    button: t('modules.storage.fileTable.storageLimitReached.button'),
  };

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
        tabulations={getTabulationAmount()}
        name={row.name}
        selected={!!row.selected}
      />
      <TableCell
        className={classes.iconSizeContainer}
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
      <TableCell>
        <IconsCell
          localStorageActive={row.isLocallyAvailable}
          spaceStorageActive={row.isAvailableInSpace}
          sharedCount={shareAmount < 0 ? 0 : shareAmount}
          storageLimitWarning={false}
          upgradeOnClick={(e) => {
            e.stopPropagation();
            dispatch(openModal(LICENSE_REGISTRATION));
          }}
          i18n={iconsCellI18n}
        />
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
  }).isRequired,
  arrowOnClick: PropTypes.func,
};

export default RenderRow;
