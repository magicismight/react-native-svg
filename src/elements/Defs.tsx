import * as React from 'react';
import { RNSVGDefs } from './NativeComponents';

export default class Defs extends React.Component {
  static displayName = 'Defs';

  render() {
    return <RNSVGDefs>{this.props.children}</RNSVGDefs>;
  }
}
