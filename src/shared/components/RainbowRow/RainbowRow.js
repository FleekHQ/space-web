import React from 'react';
import PropTypes from 'prop-types';

import { useRainbowRowState } from '@shared/utils/rainbow-row-context';

import useStyles, { rowHeight, headHeight } from './styles';

const RAINBOW_BORDER_WIDTH = 2;

const RainbowRow = ({ objectsList }) => {
  const state = useRainbowRowState();

  const rowNumber = state.rowIndex;

  const tabulation = 0;
  const tabulationAmount = tabulation * 30;

  const listLength = objectsList.length;
  const defaultHeight = listLength * rowHeight;

  const classes = useStyles();

  const recYOffset = rowNumber === -1 ? headHeight : (headHeight + rowNumber * rowHeight + 1);
  const recHeight = rowNumber === -1 ? defaultHeight : rowHeight;

  const getSvg = (overrideSvgProps) => (
    state.active && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`calc(100% - ${RAINBOW_BORDER_WIDTH + tabulationAmount}px)`}
        height={`calc(100% + ${RAINBOW_BORDER_WIDTH * 2}px)`}
        className={classes.rainbowBox}
      >
        <linearGradient id="dropzone-gradient" x1="0%" y1="25%" x2="100%" y2="75%">
          <stop offset="18%" stopColor="#ed55eb" />
          <stop offset="42%" stopColor="#17e0d8" />
          <stop offset="59%" stopColor="#00ffc2" />
          <stop offset="81%" stopColor="#ffec06" />
        </linearGradient>
        <rect
          fill="transparent"
          y={recYOffset}
          x={`${(RAINBOW_BORDER_WIDTH / 2) + tabulationAmount}px`}
          width="100%"
          height={recHeight}
          style={{ transition: 'y ease .17s, height ease .17s, width ease .17s, x ease .17s' }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...overrideSvgProps}
        />
      </svg>
    )
  );

  return (
    <>
      {getSvg({
        fill: 'url(#dropzone-gradient)',
      })}
      {getSvg({
        stroke: 'url(#dropzone-gradient)',
        strokeWidth: RAINBOW_BORDER_WIDTH,
      })}
    </>
  );
};

RainbowRow.defaultProps = {
  objectsList: [],
};

RainbowRow.propTypes = {
  objectsList: PropTypes.oneOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        name: PropTypes.string,
        isFolder: PropTypes.bool,
      }),
    ),
    [],
  ),
};

export default RainbowRow;
