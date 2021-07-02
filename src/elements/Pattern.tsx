import * as React from 'react';
import extractTransform from '../lib/extract/extractTransform';
import extractViewBox from '../lib/extract/extractViewBox';
import { NumberProp, TransformProps } from '../lib/extract/types';
import units from '../lib/units';
import Shape from './Shape';
import { RNSVGPattern } from './NativeComponents';

export default class Pattern extends Shape<{
  id?: string;
  x?: NumberProp;
  y?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
  viewBox?: string;
  preserveAspectRatio?: string;
  transform?: number[] | string | TransformProps;
  patternTransform?: number[] | string | TransformProps;
  patternUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  patternContentUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
}> {
  static displayName = 'Pattern';

  static defaultProps = {
    x: '0%',
    y: '0%',
    width: '100%',
    height: '100%',
  };

  render() {
    const { props } = this;
    const {
      patternTransform,
      transform,
      id,
      x,
      y,
      width,
      height,
      patternUnits,
      patternContentUnits,
      children,
      viewBox,
      preserveAspectRatio,
    } = props;
    const matrix = extractTransform(patternTransform || transform || props);
    return (
      <RNSVGPattern
        ref={this.refMethod}
        name={id}
        x={x}
        y={y}
        width={width}
        height={height}
        matrix={matrix}
        patternTransform={matrix}
        patternUnits={(patternUnits && units[patternUnits]) || 0}
        patternContentUnits={
          patternContentUnits ? units[patternContentUnits] : 1
        }
        {...extractViewBox({ viewBox, preserveAspectRatio })}
      >
        {children}
      </RNSVGPattern>
    );
  }
}
