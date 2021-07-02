import * as React from 'react';
import { extract } from '../lib/extract/extractProps';
import { NumberProp } from '../lib/extract/types';
import Shape from './Shape';
import { RNSVGCircle } from './NativeComponents';

export default class Circle extends Shape<{
  cx?: NumberProp;
  cy?: NumberProp;
  r?: NumberProp;
}> {
  static displayName = 'Circle';

  static defaultProps = {
    cx: 0,
    cy: 0,
    r: 0,
  };

  render() {
    const { props } = this;
    const { cx, cy, r } = props;
    return (
      <RNSVGCircle
        ref={this.refMethod}
        {...extract(this, props)}
        cx={cx}
        cy={cy}
        r={r}
      />
    );
  }
}
