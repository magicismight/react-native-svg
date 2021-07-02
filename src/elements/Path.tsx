import * as React from 'react';
import { extract } from '../lib/extract/extractProps';
import Shape from './Shape';
import { RNSVGPath } from './NativeComponents';

export default class Path extends Shape<{
  d?: string;
}> {
  static displayName = 'Path';

  render() {
    const { props } = this;
    return (
      <RNSVGPath ref={this.refMethod} {...extract(this, props)} d={props.d} />
    );
  }
}
