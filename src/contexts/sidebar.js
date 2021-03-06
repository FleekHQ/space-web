import React from 'react';
import PropTypes from 'prop-types';

export const SidebarContext = React.createContext([{}, () => {}]);

const SidebarContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    isExtended: false,
    links: [
      {
        id: 'pricing',
        to: '/pricing',
        name: 'Pricing',
      },
      {
        id: 'developers',
        to: '/developers',
        name: 'Developers',
      },
      {
        id: 'about',
        to: '/about',
        name: 'About',
      },
      {
        id: 'blog',
        name: 'Blog',
        target: '_blank',
        to: 'https://blog.space.storage/',
      },
      {
        id: 'faq',
        to: '/faq',
        name: 'FAQ',
      },
    ],
  });

  return (
    <SidebarContext.Provider value={[state, setState]}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  SidebarContextProvider,
};
