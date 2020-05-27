import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table, { TableCell, TableRow, FileCell } from '@ui/Table';

import useStyles from './styles';

const OPTIONS_TARGET_ID = 'options';

const FileTable = (props) => {
  const {
    rows,
    onClick,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const head = [
    t('modules.storage.fileTable.head.name'),
    t('modules.storage.fileTable.head.members'),
    t('modules.storage.fileTable.head.lastModified'),
    ''
  ];

  const renderHead = ({ head = [] }) => (
    <TableRow>
      {head.map((label) => (
        <TableCell key={label} className={classes.headerCell}>
          <Typography variant="body2">
            {label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );

  // TODO: replace options by menu dropdown and members column value
  const renderRow = ({ row }) => (
    <TableRow
      hover
      key={row.id}
      className={classes.row}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetId = e.target.getAttribute('target-id');

        if (targetId !== OPTIONS_TARGET_ID) {
          onClick(row);
        }
      }}
    >
      <FileCell ext={row.ext} src={row.src}>
        <Typography variant="body1" noWrap>
          {row.name}
        </Typography>
      </FileCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          Only you
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {row.lastModified}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <ButtonBase
          className={classes.options}
          target-id={OPTIONS_TARGET_ID}
        >
          ●●●
        </ButtonBase>
      </TableCell>
    </TableRow>
  );

  return (
    <Table
      head={head}
      rows={rows}
      renderRow={renderRow}
      renderHead={renderHead}
      className={classes.root}
    />
  );
};

FileTable.defaultProps = {
  rows: [],
  onClick: () => {},
};

FileTable.propTypes = {
  onClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    ext: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    lastModified: PropTypes.string,
  }))
};

export default FileTable;
