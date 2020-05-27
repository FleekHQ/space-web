import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const Dropdown = ({
  open,
  items,
  setOpen,
  ...restProps
}) => {
  const classes = useStyles(restProps);

  if (!open) {
    return null;
  }

  return (
    <div className={classes.container}>
      {items.map(({ component: Component, id, ...itemProps }) => (
          <Component
            key={id}
            setParentOpen={setOpen}
            {...itemProps}
          />
        ))}
    </div>
  );
};

Dropdown.defaultProps = {
  setOpen: () => {},
};

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  left: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  setOpen: PropTypes.func,
}

export default Dropdown;

