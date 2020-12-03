/* eslint-disable */
import React from 'react';
import HoverMenu from '@ui/HoverMenu';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';

const HoverTooltip = ({
  rowProps,
  hoveredItemOptions,
  hoveredItemSizePosition,
  hoveredItemIndex,
  hoverMenuItemOnClick,
  ...restProps
}) => {
  const { t } = useTranslation();
  const { children, ...props } = rowProps;

  const classes = useStyles({
    hoveredItemOptions,
    hoveredItemSizePosition,
    hoveredItemIndex,
  });

  return (
    <Tooltip
    // PopperProps={{
    //   style: {
    //     top: '100px !important',
    //     right: 0 + hoveredItemOptions.length * 32,
    //     left: 'auto !important',
    //     transform: 'none !important',
    //   }
    // }}
    // onOpen={() => {
    //   setIsHoverOpen(true);
    // }}
    // onClose={() => {
    //   setIsHoverOpen(false);
    // }}
    interactive
    classes={{
      tooltip: classes.tooltipRoot,
      popper: classes.popperRoot,
    }}
    title={
      <HoverMenu
        i18n={{
          retry: t('hoverMenu.retry'),
          cancel: t('hoverMenu.cancel'),
        }}
        items={hoveredItemOptions}
        menuItemOnClick={hoverMenuItemOnClick}
      />
    }
    {...restProps}
  >
    <tr {...props}>
      {children}
    </tr>
  </Tooltip>
  );
};

export default HoverTooltip;
