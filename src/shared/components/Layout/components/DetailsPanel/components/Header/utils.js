import { HORIZONTAL_PADDING } from './styles';
import { DETAILS_PANEL_WIDTH } from '../../styles';

export const MAX_NUMBER_OF_ICONS_PREVIEW = 4;
const ICON_CONTAINER_WIDTH = DETAILS_PANEL_WIDTH - 2 * HORIZONTAL_PADDING;
const ICON_MAX_WIDTH = 120;
const SIZE_SCALAR = 0.378;
// ^ smaller -> bigger icon, bigger -> smaller icon, ∈ (0, 1)
const PROPORTION_OFFSETS_X_TO_Y = 0.3;

export const getIconStyles = (index, objectsTotal) => {
  const total = Math.min(objectsTotal, MAX_NUMBER_OF_ICONS_PREVIEW);
  const iconSize = (1 / total) ** SIZE_SCALAR * ICON_MAX_WIDTH;
  const maxIconX = ICON_CONTAINER_WIDTH - iconSize;
  const macIconY = maxIconX * PROPORTION_OFFSETS_X_TO_Y;
  const OFFSET_FACTOR = total - 1 || 1; // OR to avoid dividing by zero

  return {
    right: index * (maxIconX / OFFSET_FACTOR),
    bottom: index * (macIconY / OFFSET_FACTOR),
    zIndex: total - index,
    width: iconSize,
    height: iconSize,
  };
};
