const DEFAULT_SHARED_BY_ROUTE = '/storage/shared-by';

const { PUBLIC_URL } = process.env;

const getBreadcrumbOptions = ({
  imgUrl = `${PUBLIC_URL}/assets/images/default_avatar.png`,
  location,
}) => {
  // split path from 'shared-by/*' and remove empty strings in the array
  const [, ...options] = location.pathname.split('/').filter((str) => str.length).slice(1);
  const optionObjs = options.map((option, index) => {
    const link = `${DEFAULT_SHARED_BY_ROUTE}/${options.slice(0, index + 1).join('/')}`;

    return {
      link,
      name: option,
      imgUrl: index === 0 ? imgUrl : null,
    };
  });

  return optionObjs;
};

export default {
  getBreadcrumbOptions,
};
