import * as React from 'react';
import {
  createElement,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  // @ts-ignore
  unstable_createElement,
} from 'react-native';
import { NumberArray, NumberProp } from './lib/extract/types';
import { resolve } from './lib/resolve';

interface BaseProps extends Omit<TouchableWithoutFeedbackProps, 'style'> {
  // web only TouchableWithoutFeedback props
  focusable?: boolean;
  nativeID?: string;
  rejectResponderTermination?: boolean;

  children?: React.ReactNode;
  fontFamily?: string;
  fontSize?: NumberProp;
  fontStyle?: string;
  fontWeight?: NumberProp;
  forwardedRef?: {};
  originX?: NumberProp;
  originY?: NumberProp;
  rotation?: NumberArray;
  scale?: NumberArray;
  skewX?: NumberProp;
  skewY?: NumberProp;
  style?: Iterable<{}>;
  translate?: NumberArray;
}

const createComponent = <P extends BaseProps = BaseProps>(
  type: keyof React.ReactSVG,
) => (props: P): React.ReactElement<P> =>
  (unstable_createElement || createElement)(type, props);

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0,
  },
});

const prepare = <P extends BaseProps = BaseProps>(
  Component: (props: P) => React.ReactElement<P>,
): React.FC<P> => props => {
  const {
    delayLongPress,
    delayPressIn,
    delayPressOut,
    disabled,
    focusable,
    onBlur,
    onFocus,
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    rejectResponderTermination,

    children,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    forwardedRef,
    originX,
    originY,
    rotation,
    scale,
    skewX,
    skewY,
    style,
    translate,

    // other TouchableWithoutFeedback props
    // unsupported by react-native-web implem
    hasTVPreferredFocus,
    hitSlop,
    pressRetentionOffset,
    touchSoundDisabled,
    tvParallaxProperties,

    ...rest
  } = props;

  const clean: typeof rest & {
    ref?: {};
    style?: {};
    transform?: string;
  } = rest;

  const transform = [];

  if (originX != null || originY != null) {
    transform.push(`translate(${originX || 0}, ${originY || 0})`);
  }
  if (translate != null) {
    transform.push(`translate(${translate})`);
  }
  if (scale != null) {
    transform.push(`scale(${scale})`);
  }
  // rotation maps to rotate, not to collide with the text rotate attribute (which acts per glyph rather than block)
  if (rotation != null) {
    transform.push(`rotate(${rotation})`);
  }
  if (skewX != null) {
    transform.push(`skewX(${skewX})`);
  }
  if (skewY != null) {
    transform.push(`skewY(${skewY})`);
  }
  if (originX != null || originY != null) {
    transform.push(`translate(${-originX || 0}, ${-originY || 0})`);
  }

  if (transform.length) {
    clean.transform = transform.join(' ');
  }

  if (forwardedRef) {
    clean.ref = forwardedRef;
  }

  const additionalStyles: {
    fontStyle?: string;
    fontFamily?: string;
    fontSize?: NumberProp;
    fontWeight?: NumberProp;
  } = {};

  if (fontFamily != null) {
    additionalStyles.fontFamily = fontFamily;
  }
  if (fontSize != null) {
    additionalStyles.fontSize = fontSize;
  }
  if (fontWeight != null) {
    additionalStyles.fontWeight = fontWeight;
  }
  if (fontStyle != null) {
    additionalStyles.fontStyle = fontStyle;
  }

  clean.style = StyleSheet.compose(
    styles.base,
    resolve(style, additionalStyles),
  );

  if (!(onLongPress || onPress || onPressIn || onPressOut)) {
    return React.createElement(Component, rest, children);
  }

  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    accessible,
    importantForAccessibility,
    nativeID,
    onLayout,
    testID,

    ...childProps
  } = rest;

  return React.createElement(
    TouchableWithoutFeedback,
    {
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityRole,
      accessibilityState,
      accessibilityValue,
      accessible,
      importantForAccessibility,
      // @ts-expect-error
      nativeID,
      testID,

      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      focusable,
      onBlur,
      onFocus,
      onLayout,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      rejectResponderTermination,
    },
    React.createElement(Component, childProps, children),
  );
};

export const Circle = prepare(createComponent('circle'));
export const ClipPath = prepare(createComponent('clipPath'));
export const Defs = prepare(createComponent('defs'));
export const Ellipse = prepare(createComponent('ellipse'));
export const ForeignObject = prepare(createComponent('foreignObject'));
export const Image = prepare(createComponent('image'));
export const Line = prepare(createComponent('line'));
export const LinearGradient = prepare(createComponent('linearGradient'));
export const Marker = prepare(createComponent('marker'));
export const Mask = prepare(createComponent('mask'));
export const Path = prepare(createComponent('path'));
export const Pattern = prepare(createComponent('pattern'));
export const Polygon = prepare(createComponent('polygon'));
export const Polyline = prepare(createComponent('polyline'));
export const RadialGradient = prepare(createComponent('radialGradient'));
export const Rect = prepare(createComponent('rect'));
export const Stop = prepare(createComponent('stop'));
export const Svg = prepare(createComponent('svg'));
export const Symbol = prepare(createComponent('symbol'));
export const TSpan = prepare(createComponent('tspan'));
export const Text = prepare(createComponent('text'));
export const TextPath = prepare(createComponent('textPath'));
export const Use = prepare(createComponent('use'));

export const G = (
  props: BaseProps & {
    x?: NumberProp;
    y?: NumberProp;
    translate?: string;
  },
) => {
  const { x, y, ...rest } = props;

  if ((x || y) && !rest.translate) {
    rest.translate = `${x || 0}, ${y || 0}`;
  }

  return prepare(createComponent('g'))(rest);
};

Circle.displayName = 'Circle';
ClipPath.displayName = 'ClipPath';
Defs.displayName = 'Defs';
Ellipse.displayName = 'Ellipse';
ForeignObject.displayName = 'ForeignObject';
G.displayName = 'G';
Image.displayName = 'Image';
Line.displayName = 'Line';
LinearGradient.displayName = 'LinearGradient';
Marker.displayName = 'Marker';
Mask.displayName = 'Mask';
Path.displayName = 'Path';
Pattern.displayName = 'Pattern';
Polygon.displayName = 'Polygon';
Polyline.displayName = 'Polyline';
RadialGradient.displayName = 'RadialGradient';
Rect.displayName = 'Rect';
Stop.displayName = 'Stop';
Svg.displayName = 'Svg';
Symbol.displayName = 'Symbol';
TSpan.displayName = 'TSpan';
Text.displayName = 'Text';
TextPath.displayName = 'TextPath';
Use.displayName = 'Use';

export default Svg;
