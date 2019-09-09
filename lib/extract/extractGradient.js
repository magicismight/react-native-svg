import React, { Children } from 'react';

import extractColor from './extractColor';
import extractOpacity from './extractOpacity';
import extractTransform from './extractTransform';
import units from '../units';

const percentReg = /^([+\-]?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)(%?)$/;

function percentToFloat(percent) {
  if (typeof percent === 'number') {
    return percent;
  }
  if (
    typeof percent === 'object' &&
    typeof percent.__getAnimatedValue === 'function'
  ) {
    return percent.__getAnimatedValue();
  }
  const matched = typeof percent === 'string' && percent.match(percentReg);
  if (!matched) {
    console.warn(`"${percent}" is not a valid number or percentage string.`);
    return 0;
  }

  return matched[2] ? matched[1] / 100 : +matched[1];
}

const offsetComparator = (object, other) => object[0] - other[0];

const childHRefCache = {}

export default function extractGradient(props, parent) {
  const { id, children, gradientTransform, transform, gradientUnits, href } = props;
  if (!id) {
    return null;
  }

  const stops = [];
  const childArray = ( href )
    ? childHRefCache[href]
    : Children.map(children, child =>
    React.cloneElement(child, {
      parent,
    }),
  );

  if ( !childArray ) {
    return null;
  }

  if ( !href ) {
    childHRefCache["#" + id] = childArray
  }

  const l = childArray.length;
  for (let i = 0; i < l; i++) {
    const {
      props: { offset, stopColor, stopOpacity },
    } = childArray[i];
    const offsetNumber = percentToFloat(offset || 0);
    const color = stopColor && extractColor(stopColor);
    if (typeof color !== 'number' || isNaN(offsetNumber)) {
      console.warn(
        `"${stopColor}" is not a valid color or "${offset}" is not a valid offset`,
      );
      continue;
    }
    const alpha = Math.round(extractOpacity(stopOpacity) * 255);
    stops.push([offsetNumber, (color & 0x00ffffff) | (alpha << 24)]);
  }
  stops.sort(offsetComparator);

  const gradient = [];
  const k = stops.length;
  for (let j = 0; j < k; j++) {
    const s = stops[j];
    gradient.push(s[0], s[1]);
  }

  return {
    name: id,
    gradient,
    children: childArray,
    gradientUnits: units[gradientUnits] || 0,
    gradientTransform: extractTransform(
      gradientTransform || transform || props,
    ),
  };
}
