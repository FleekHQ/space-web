/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import HoverMenu from '@ui/HoverMenu';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';

const HoverTooltip = ({
  rowProps,
  hoveredItemOptions,
  hoveredItemIndex,
  hoverMenuItemOnClick,
  ...restProps
}) => {
  const { t } = useTranslation();
  const { children, ...props } = rowProps;

  const classes = useStyles({
    hoveredItemIndex,
  });

  return (
    <Tooltip
      interactive
      classes={{
        tooltip: classes.tooltipRoot,
        popper: classes.popperRoot,
      }}
      title={(
        <HoverMenu
          i18n={{
            retry: t('hoverMenu.retry'),
            cancel: t('hoverMenu.cancel'),
          }}
          items={hoveredItemOptions}
          menuItemOnClick={hoverMenuItemOnClick}
        />
      )}
      {...restProps}
    >
      <tr {...props}>
        {children}
      </tr>
    </Tooltip>
  );
};

HoverTooltip.defaultProps = {
  hoveredItemIndex: 0,
};

HoverTooltip.propTypes = {
  rowProps: PropTypes.shape({
    children: PropTypes.node,
    props: PropTypes.shape({}),
  }).isRequired,
  hoveredItemOptions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  hoverMenuItemOnClick: PropTypes.func.isRequired,
  hoveredItemIndex: PropTypes.number,
};

export default HoverTooltip;
