import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchSharedObjects } from '@events/objects';
import { useHistory, matchPath, useLocation } from 'react-router-dom';

import { openModal, FILE_LINK_PASSWORD } from '@shared/components/Modal/actions';
import mapBreadcrumbs from '@shared/utils/map-breadcrumbs';
import Breadcrumbs from '@ui/Breadcrumbs';

import { FileTable, HeaderNav, FilesErrors } from '../shared/components';
import useStyles from './styles';

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
      />
    </div>
  );
};

export default SharedWithMeView;
