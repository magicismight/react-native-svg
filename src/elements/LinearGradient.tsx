import * as React from 'react';
import extractGradient from '../lib/extract/extractGradient';
import { NumberProp, TransformProps } from '../lib/extract/types';
import Shape from './Shape';
import { RNSVGLinearGradient } from './NativeComponents';

export default class LinearGradient extends Shape<{
  id?: string;
  x1?: NumberProp;
  y1?: NumberProp;
  x2?: NumberProp;
  y2?: NumberProp;
  children?: React.ReactElement[];
  transform?: number[] | string | TransformProps;
  gradientTransform?: number[] | string | TransformProps;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
}> {
  static displayName = 'LinearGradient';

  static defaultProps = {
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
  };

  render() {
    const { props } = this;
    const { x1, y1, x2, y2 } = props;
    return (
      <RNSVGLinearGradient
        ref={this.refMethod}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        {...extractGradient(props, this)}
      />
    );
  }
}
