import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './styles';

const CreateNewMenu = ({
  close,
  items,
  isSubmenu,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div
      className={classnames(classes.container, {
        [classes.subMenu]: isSubmenu,
      })}
    >
      {items.map(({ component: Component, id, ...itemProps }) => (
        <Component
          key={id}
          id={id}
          closeParent={close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...itemProps}
        />
      ))}
    </div>
  );
};

CreateNewMenu.defaultProps = {
  isSubmenu: false,
};

CreateNewMenu.propTypes = {
  close: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isSubmenu: PropTypes.bool,
};

export default CreateNewMenu;
