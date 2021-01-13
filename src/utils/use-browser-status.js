import React from 'react';

const useOnlineStatus = () => {
  const [isOnline, setOnline] = React.useState(window.navigator.onLine);

  const offlineOnlineHandler = (event) => {
    setOnline(navigator.OnLine);

    if (event.type === 'online') {
      setOnline(true);
      return;
    }

    setOnline(false);
  };

  React.useEffect(() => {
    window.addEventListener('online', offlineOnlineHandler);
    window.addEventListener('offline', offlineOnlineHandler);

    return () => {
      window.removeEventListener('online', offlineOnlineHandler);
      window.removeEventListener('offline', offlineOnlineHandler);
    };
  });

  return {
    isOnline,
  };
};

export default useOnlineStatus;
