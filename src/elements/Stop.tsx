import * as React from 'react';

type StopProps = {
  parent?: React.Component;
};

export default class Stop extends React.Component<StopProps, {}> {
  props!: StopProps;
  static displayName = 'Stop';

  setNativeProps = () => {
    const { parent } = this.props;
    if (parent) {
      parent.forceUpdate();
    }
  };

  render() {
    return null;
  }
}
