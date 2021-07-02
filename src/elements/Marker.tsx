import * as React from 'react';
import extractViewBox from '../lib/extract/extractViewBox';
import { NumberProp } from '../lib/extract/types';
import Shape from './Shape';
import { RNSVGMarker } from './NativeComponents';

export default class Marker extends Shape<{
  id?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
  refX?: NumberProp;
  refY?: NumberProp;
  markerWidth?: NumberProp;
  markerHeight?: NumberProp;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse';
  orient?: 'auto' | 'auto-start-reverse' | NumberProp;
}> {
  static displayName = 'Marker';

  static defaultProps = {
    refX: 0,
    refY: 0,
    orient: '0',
    markerWidth: 3,
    markerHeight: 3,
    markerUnits: 'strokeWidth',
  };

  render() {
    const { props } = this;
    const {
      id,
      viewBox,
      preserveAspectRatio,
      refX,
      refY,
      markerUnits,
      orient,
      markerWidth,
      markerHeight,
      children,
    } = props;
    return (
      <RNSVGMarker
        ref={this.refMethod}
        name={id}
        refX={refX}
        refY={refY}
        orient={String(orient)}
        markerUnits={markerUnits}
        markerWidth={markerWidth}
        markerHeight={markerHeight}
        {...extractViewBox({ viewBox, preserveAspectRatio })}
      >
        {children}
      </RNSVGMarker>
    );
  }
}
