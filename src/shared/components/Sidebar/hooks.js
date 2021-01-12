import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TODO: remove it if not necessary
const getDefaultConfig = (location) => ([
  {
    key: 'storage',
    icon: 'files',
    to: '/home',
    active: !!matchPath(location.pathname, { path: '/storage' }),
    subNav: [
      {
        key: 'files',
        to: '/home',
      },
      {
        key: 'shared-by',
        to: '/shared',
      },
    ],
  },
]);

// eslint-disable-next-line import/prefer-default-export
export const useNavigations = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const generalNav = getDefaultConfig(location);
  const { key } = generalNav.find((navItem) => navItem.active) || {
    key: '',
    subNav: [],
  };

  return {
    generalNav,
    specificNav: {
      title: t(`navigation.${key}`),
      list: [
        {
          key: 'home',
          text: 'My Space',
          to: '/home',
          active: !!matchPath(location.pathname, { path: '/home' }),
        },
        {
          key: 'shared',
          text: 'Shared with me',
          to: '/shared',
          active: !!matchPath(location.pathname, { path: '/shared' }),
        },
      ],
    },
  };
};
