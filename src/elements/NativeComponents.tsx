import { ComponentType } from 'react';
import { requireNativeComponent as rnc } from 'react-native';

type NativeComponent = ComponentType<Record<string, unknown>>;

export const RNSVGSvg: NativeComponent = rnc('RNSVGSvgView');
export const RNSVGCircle: NativeComponent = rnc('RNSVGCircle');
export const RNSVGClipPath: NativeComponent = rnc('RNSVGClipPath');
export const RNSVGDefs: NativeComponent = rnc('RNSVGDefs');
export const RNSVGEllipse: NativeComponent = rnc('RNSVGEllipse');
export const RNSVGForeignObject: NativeComponent = rnc('RNSVGForeignObject');
export const RNSVGGroup: NativeComponent = rnc('RNSVGGroup');
export const RNSVGImage: NativeComponent = rnc('RNSVGImage');
export const RNSVGLine: NativeComponent = rnc('RNSVGLine');
export const RNSVGLinearGradient: NativeComponent = rnc('RNSVGLinearGradient');
export const RNSVGMarker: NativeComponent = rnc('RNSVGMarker');
export const RNSVGMask: NativeComponent = rnc('RNSVGMask');
export const RNSVGPath: NativeComponent = rnc('RNSVGPath');
export const RNSVGPattern: NativeComponent = rnc('RNSVGPattern');
export const RNSVGRadialGradient: NativeComponent = rnc('RNSVGRadialGradient');
export const RNSVGRect: NativeComponent = rnc('RNSVGRect');
export const RNSVGSymbol: NativeComponent = rnc('RNSVGSymbol');
export const RNSVGText: NativeComponent = rnc('RNSVGText');
export const RNSVGTextPath: NativeComponent = rnc('RNSVGTextPath');
export const RNSVGTSpan: NativeComponent = rnc('RNSVGTSpan');
export const RNSVGUse: NativeComponent = rnc('RNSVGUse');
