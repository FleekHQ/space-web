import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import Typography from '@ui/Typography';
import FolderNavButton from '@ui/FolderNavButton';
import TextField from '@ui/TextField';
import FileTable from '@shared/components/FileTable';
import useStyles from './styles';

const defaultRows = [
  {
    id: 'a1',
    type: 'folder',
    ext: 'folder',
    name: 'Analytics',
    lastModified: 'Apr 1, 2020 1:02:56 PM EST',
    size: '429.0 B',
    selected: false,
  },
  {
    id: 'b2',
    type: 'file',
    name: 'TechDocsV2.docx',
    ext: 'docx',
    lastModified: 'Mar 12, 2020 12:11:32 PM EST',
    size: '773.0 B',
    selected: false,
  },
  {
    id: 'c3',
    type: 'file',
    ext: 'pdf',
    name: 'IPFS-Report.pdf',
    lastModified: 'Mar 15, 2020 15:45:12 PM EST',
    size: '112.0 B',
    selected: false,
  },
  {
    id: 'd4',
    type: 'file',
    ext: 'zip',
    name: 'Branding.zip',
    lastModified: 'Feb 22, 2020 18:29:44 PM EST',
    size: '518.0 B',
    selected: false,
  },
  {
    id: 'e5',
    type: 'file',
    ext: 'pptx',
    name: 'IPFS-Summit.pptx',
    lastModified: 'Jun 17, 2020 20:33:01 PM EST',
    size: '201.0 B',
    selected: true,
  },
  {
    id: 'f6',
    type: 'file',
    ext: 'jpg',
    src: 'data:image/png;base64,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',
    name: 'TwitterProPic.jpg',
    lastModified: 'Jan 11, 2020 19:18:00 PM EST',
    size: '599.5 B',
    selected: true,
  },
  {
    id: 'g7',
    type: 'file',
    ext: 'sh',
    name: 'key.sh',
    lastModified: 'Apr 23, 2020 13:55:17 PM EST',
    size: '800.0 KB',
    selected: true,
  },
];

const StorageMainView = ({ rows }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FolderNavButton direction="back" disabled />
        <FolderNavButton
          direction="forward"
          className={classes.forwardButton}
          disabled
        />
        <TextField
          variant="filled"
          label={t('common.search')}
          className={classes.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Typography variant="h6" className={classes.title} weight="medium">
        {t('navigation.files')}
      </Typography>
      <div className={classes.tableWrapper}>
        <FileTable rows={defaultRows} />
      </div>
    </div>
  );
};

StorageMainView.propTypes = {
  rows: PropTypes.array,
}

export default StorageMainView;
