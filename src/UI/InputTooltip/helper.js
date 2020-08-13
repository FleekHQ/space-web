import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import { faArrowCircleUp } from '@fortawesome/pro-regular-svg-icons/faArrowCircleUp';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons/faExclamationCircle';

const getIconByType = (type) => {
  const icons = {
    info: faInfoCircle,
    upgrade: faArrowCircleUp,
    danger: faExclamationCircle,
  };

  return icons[type] || icons.info;
};

export default {
  getIconByType,
};
