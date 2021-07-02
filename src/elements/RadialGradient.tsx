import * as React from 'react';
import extractGradient from '../lib/extract/extractGradient';
import { NumberProp, TransformProps } from '../lib/extract/types';
import Shape from './Shape';
import { RNSVGRadialGradient } from './NativeComponents';

export default class RadialGradient extends Shape<{
  fx?: NumberProp;
  fy?: NumberProp;
  rx?: NumberProp;
  ry?: NumberProp;
  r?: NumberProp;
  cx?: NumberProp;
  cy?: NumberProp;
  id?: string;
  children?: React.ReactElement[];
  transform?: number[] | string | TransformProps;
  gradientTransform?: number[] | string | TransformProps;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
}> {
  static displayName = 'RadialGradient';

  static defaultProps = {
    cx: '50%',
    cy: '50%',
    r: '50%',
  };

  render() {
    const { props } = this;
    const { rx, ry, r, cx, cy, fx = cx, fy = cy } = props;
    return (
      <RNSVGRadialGradient
        ref={this.refMethod}
        fx={fx}
        fy={fy}
        rx={rx || r}
        ry={ry || r}
        cx={cx}
        cy={cy}
        {...extractGradient(props, this)}
      />
    );
  }
}
