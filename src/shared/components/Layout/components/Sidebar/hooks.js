import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const getDefaultConfig = (location) => ([
  {
    key: 'storage',
    icon: 'files',
    to: '/storage/files',
    active: !!matchPath(location.pathname, { path: '/storage/files' }),
    subNav: [
      {
        key: 'files',
        to: '/storage/files',
      },
    ],
  }
]);

export const useNavigations = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const generalNav = getDefaultConfig(location);
  const { key, subNav } = generalNav.find((navItem) => navItem.active) || {
    key: '',
    subNav: [],
  };
  const specificNavList = subNav.map((navItem) => ({
    ...navItem,
    text: t(`navigation.${navItem.key}`),
    active: !!matchPath(location.pathname, { path: navItem.to }),
  }));

  return {
    generalNav,
    specificNav: {
      title: t(`navigation.${key}`),
      list: specificNavList,
    },
  };
};
