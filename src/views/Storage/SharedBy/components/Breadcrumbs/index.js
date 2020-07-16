import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/faAngleRight';

import palette from '@ui/theme/palette/palette';
import Breadcrumb from '@shared/components/Breadcrumb';

import { useLocation, useRouteMatch } from 'react-router-dom';

import helper from './helper';

const SharedByBreadcrumbs = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();

  // TODO: pass user img
  const breadcrumbOptions = helper.getBreadcrumbOptions({ location });

  return (
    <Breadcrumbs
      aria-label="shared-by-breadcrumbs"
      separator={(
        <FontAwesomeIcon color={palette.gray1} icon={faAngleRight} />
      )}
    >
      <Breadcrumb name={t('navigation.shared-by')} link={match.path} />
      {
        breadcrumbOptions.map((option) => (
          <Breadcrumb
            link={option.link}
            name={option.name}
            imgUrl={option.imgUrl}
          />
        ))
      }
    </Breadcrumbs>
  );
};

export default SharedByBreadcrumbs;
