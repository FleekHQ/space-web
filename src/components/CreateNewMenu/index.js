import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { ITEM_TYPES } from './constants';
import Divider from '@material-ui/core/Divider';
import Option from './components/Option';

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

  const componentMapping = {
    [ITEM_TYPES.OPTION]: Option,
    [ITEM_TYPES.DIVIDER]: Divider,
  };

  return (
    <div className={classes.container}>
      {items.map((item) => {
        const TypeComponent = componentMapping[item.type] || Option;

        return (
          <TypeComponent
            key={item.id}
            setParentOpen={setOpen}
            {...item}
          />
        );
      })}
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

