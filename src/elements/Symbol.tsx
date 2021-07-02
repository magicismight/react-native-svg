import * as React from 'react';
import extractViewBox from '../lib/extract/extractViewBox';
import Shape from './Shape';
import { RNSVGSymbol } from './NativeComponents';

export default class Symbol extends Shape<{
  id?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
}> {
  static displayName = 'Symbol';

  render() {
    const { props } = this;
    const { id, children } = props;
    return (
      <RNSVGSymbol ref={this.refMethod} name={id} {...extractViewBox(props)}>
        {children}
      </RNSVGSymbol>
    );
  }
}
