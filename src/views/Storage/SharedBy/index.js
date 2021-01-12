import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchSharedObjects } from '@events/objects';
import { useHistory, matchPath, useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Breadcrumbs from '@ui/Breadcrumbs';
import Sidebar from '@shared/components/Sidebar';
import mapBreadcrumbs from '@shared/utils/map-breadcrumbs';
import Layout from '@terminal-packages/space-ui/core/Layout';
import { openModal, FILE_LINK_PASSWORD } from '@shared/components/Modal/actions';

import useStyles from './styles';
import DetailsPanel from '../DetailsPanel';
import SharedRenderRow from '../shared/ShareRenderRow';
import {
  FileTable,
  HeaderNav,
  FilesErrors,
} from '../shared/components';

const SharedWithMeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { location } = history;
  const { t } = useTranslation();

  const match = matchPath(location.pathname, { path: '/shared/*' });
  const prefix = get(match, 'params.0', '') || '';

  useEffect(() => {
    fetchSharedObjects();
  }, [history.location.pathname]);

  useEffect(() => {
    const qs = new URLSearchParams(search);
    const hash = qs.get('hash');
    const fname = qs.get('fname');

    if (hash && fname) {
      dispatch(openModal(FILE_LINK_PASSWORD, {
        hash,
        fname,
        history,
      }));
    }
  }, []);

  const breadcrumbsItems = mapBreadcrumbs(t('navigation.shared-by'), location.pathname, history);

  return (
    <Layout
      sidebar={<Sidebar />}
      topbar={<HeaderNav />}
    >
      <Box display="flex" flexGrow={1}>
        <div className={classes.viewContent}>
          <div className={classes.root}>
            <FilesErrors
              bucket="shared-with-me"
              fetchObjects={fetchSharedObjects}
            />
            <Breadcrumbs
              items={breadcrumbsItems}
              history={history}
            />
            <FileTable
              prefix={prefix}
              disableRowOffset
              bucket="shared-with-me"
              baseRedirectUrl="/shared"
              fetchDir={fetchSharedObjects}
              renderRow={SharedRenderRow}
              type="shared"
            />
          </div>
        </div>
        <DetailsPanel />
      </Box>
    </Layout>
  );
};

export default SharedWithMeView;
