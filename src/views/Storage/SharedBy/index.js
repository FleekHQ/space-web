import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchSharedObjects } from '@events/objects';
import { useHistory, matchPath, useLocation } from 'react-router-dom';

import Breadcrumbs from '@ui/Breadcrumbs';
import mapBreadcrumbs from '@shared/utils/map-breadcrumbs';
import { openModal, FILE_LINK_PASSWORD } from '@shared/components/Modal/actions';

import useStyles from './styles';
import SharedRenderRow from '../shared/ShareRenderRow';
import { FileTable, HeaderNav, FilesErrors } from '../shared/components';

const SharedWithMeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { location } = history;
  const { t } = useTranslation();

  const match = matchPath(location.pathname, { path: '/storage/shared-by/*' });
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
    <div className={classes.root}>
      <HeaderNav />
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
        baseRedirectUrl="/storage/shared-by"
        fetchDir={fetchSharedObjects}
        renderRow={SharedRenderRow}
        type="shared"
      />
    </div>
  );
};

export default SharedWithMeView;
