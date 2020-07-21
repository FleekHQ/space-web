import React from 'react';

import {
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import FolderNavButton from '@ui/FolderNavButton';
import TextField from '@ui/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { useTranslation } from 'react-i18next';

import Breadcrumbs from './components/Breadcrumbs';
import BucketsTable from './components/BucketsTable';

import { FileTable } from '../shared/components';

import useStyles from './styles';

const SharedWithMeView = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div style={{ padding: '6px 0' }}>
      <div className={classes.header}>
        <FolderNavButton
          direction="back"
          onClick={() => {
            const isRootPath = /^\/storage\/shared-by\/?$/.test(location.pathname);

            if (!isRootPath) {
              history.goBack();
            }
          }}
        />
        <FolderNavButton
          direction="forward"
          className={classes.forwardButton}
          onClick={() => {
            const isStoragePath = /^\/storage\/shared-by\/.*/.test(location.pathname);

            if (isStoragePath) {
              history.goForward();
            }
          }}
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
      <Breadcrumbs />
      <Switch>
        <Route exact path={match.path}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span><strong>List of Buckets</strong></span>
            <Link to={`${match.path}/bucket-test/`}>BUCKET-TEST</Link>
            <BucketsTable />
          </div>
        </Route>
        <Route
          path={`${match.path}/:bucket/*`}
          render={({ match: routeMatch }) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span><strong>Bucket:&nbsp;</strong>{routeMatch.params.bucket}</span>
              <span><strong>Prefix:&nbsp;</strong>{routeMatch.params[0]}</span>
              <Link to={`${routeMatch.url}/my-sub-folder`}>To my-sub-folder</Link>
              <FileTable
                bucket={routeMatch.params.bucket}
                prefix={routeMatch.params[0] || '/'}
              />
            </div>
          )}
        />
        <Route
          path={`${match.path}/:bucket`}
          render={({ match: routeMatch }) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span><strong>Bucket:&nbsp;</strong>{routeMatch.params.bucket}</span>
              <span><strong>Prefix:&nbsp;</strong>{routeMatch.params[0]}</span>
              <Link to={`${routeMatch.url}/my-sub-folder`}>To my-sub-folder</Link>
              <FileTable
                bucket={routeMatch.params.bucket}
                prefix={routeMatch.params[0] || '/'}
              />
            </div>
          )}
        />
        <Redirect to={match.path} />
      </Switch>
    </div>
  );
};

export default SharedWithMeView;
