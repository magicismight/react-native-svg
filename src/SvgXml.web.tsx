import React from 'react';
import {
  ViewProps,
  GestureResponderHandlers,
  GestureResponderEvent,
} from 'react-native';
import { View, unstable_createElement as uce } from 'react-native-web';

// rgba values inside range 0 to 1 inclusive
// rgbaArray = [r, g, b, a]
export type rgbaArray = ReadonlyArray<number>;

// argb values inside range 0x00 to 0xff inclusive
// int32ARGBColor = 0xaarrggbb
export type int32ARGBColor = number;
type NumberProp = string | number;
type Color = int32ARGBColor | rgbaArray | string;
type FillRule = 'evenodd' | 'nonzero';
type Linecap = 'butt' | 'square' | 'round';
type Linejoin = 'miter' | 'bevel' | 'round';
type NumberArray = NumberProp[] | NumberProp;
/*

  ColumnMajorTransformMatrix

  [a, b, c, d, tx, ty]

  This matrix can be visualized as:

  ╔═      ═╗
  ║ a c tx ║
  ║ b d ty ║
  ║ 0 0 1  ║
  ╚═      ═╝

*/
type ColumnMajorTransformMatrix = [
  number,
  number,
  number,
  number,
  number,
  number,
];
interface ClipProps {
  clipRule?: FillRule;
  clipPath?: string;
}
interface FillProps {
  fill?: Color;
  fillOpacity?: NumberProp;
  fillRule?: FillRule;
}
interface StrokeProps {
  stroke?: Color;
  strokeWidth?: NumberProp;
  strokeOpacity?: NumberProp;
  strokeDasharray?: ReadonlyArray<NumberProp> | NumberProp;
  strokeDashoffset?: NumberProp;
  strokeLinecap?: Linecap;
  strokeLinejoin?: Linejoin;
  strokeMiterlimit?: NumberProp;
}
interface TransformObject {
  translate?: NumberArray;
  translateX?: NumberProp;
  translateY?: NumberProp;
  origin?: NumberArray;
  originX?: NumberProp;
  originY?: NumberProp;
  scale?: NumberArray;
  scaleX?: NumberProp;
  scaleY?: NumberProp;
  skew?: NumberArray;
  skewX?: NumberProp;
  skewY?: NumberProp;
  rotation?: NumberProp;
  x?: NumberArray;
  y?: NumberArray;
}
interface TransformProps extends TransformObject {
  transform?: ColumnMajorTransformMatrix | string | TransformObject;
}
interface ResponderProps extends GestureResponderHandlers {
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}
interface VectorEffectProps {
  vectorEffect?:
    | 'none'
    | 'non-scaling-stroke'
    | 'nonScalingStroke'
    | 'default'
    | 'inherit'
    | 'uri';
}

interface TouchableProps {
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  delayPressIn?: number;
  delayPressOut?: number;
  delayLongPress?: number;
}
interface DefinitionProps {
  id?: string;
}

interface CommonMarkerProps {
  marker?: string;
  markerStart?: string;
  markerMid?: string;
  markerEnd?: string;
}

interface CommonMaskProps {
  mask?: string;
}

interface CommonPathProps
  extends FillProps,
    StrokeProps,
    ClipProps,
    TransformProps,
    VectorEffectProps,
    ResponderProps,
    TouchableProps,
    DefinitionProps,
    CommonMarkerProps,
    CommonMaskProps {}
interface GProps extends CommonPathProps {
  opacity?: NumberProp;
}
export interface SvgProps extends GProps, ViewProps {
  width?: NumberProp;
  height?: NumberProp;
  viewBox?: string;
  preserveAspectRatio?: string;
  color?: Color;
  title?: string;
}

export interface XmlProps extends SvgProps {
  xml: string | null;
  override?: SvgProps;
}

const SvgXml = React.forwardRef<HTMLOrSVGElement, XmlProps>(
  ({ xml, ...props }: XmlProps, fowardRef) => {
    const { attributes, innerSVG } = parseSVG(xml || '');
    const camelAttributes = kebabToCamel(attributes);

    const svgRef = React.createRef<SVGElement>();
    React.useLayoutEffect(() => {
      if (!svgRef.current) {
        return;
      }
      svgRef.current.innerHTML = innerSVG;
    }, [innerSVG, svgRef]);

    const {
      height,
      width,
      viewBox,
      preserveAspectRatio,
      title,
      opacity,
      fill,
      fillOpacity,
      fillRule,
      transform,
      stroke,
      strokeWidth,
      strokeOpacity,
      strokeDasharray,
      strokeDashoffset,
      strokeLinecap,
      strokeLinejoin,
      strokeMiterlimit,
      clipRule,
      clipPath,
      vectorEffect,
      pointerEvents,
      id,
      markerStart,
      markerMid,
      markerEnd,
      mask,
      originX,
      originY,
      translate,
      scale,
      rotation,
      skewX,
      skewY,
      style,
      // props that should be applyed to the View container
      ...containerProps
    } = props;

    const transformArr: string[] = [];

    if (originX != null || originY != null) {
      transformArr.push(`translate(${originX || 0}, ${originY || 0})`);
    }
    if (translate != null) {
      transformArr.push(`translate(${translate})`);
    }
    if (scale != null) {
      transformArr.push(`scale(${scale})`);
    }
    // rotation maps to rotate, not to collide with the text rotate attribute (which acts per glyph rather than block)
    if (rotation != null) {
      transformArr.push(`rotate(${rotation})`);
    }
    if (skewX != null) {
      transformArr.push(`skewX(${skewX})`);
    }
    if (skewY != null) {
      transformArr.push(`skewY(${skewY})`);
    }
    if (originX != null || originY != null) {
      transformArr.push(`translate(${-(originX || 0)}, ${-(originY || 0)})`);
    }

    // these props should override the xml props
    const overrideProps = {
      style: { width: '100%', height: '100%' },
      transform: transformArr.length ? transformArr.join(' ') : transform,
      viewBox,
      preserveAspectRatio,
      title,
      opacity,
      fill,
      fillOpacity,
      fillRule,
      stroke,
      strokeWidth,
      strokeOpacity,
      strokeDasharray,
      strokeDashoffset,
      strokeLinecap,
      strokeLinejoin,
      strokeMiterlimit,
      clipRule,
      clipPath,
      vectorEffect,
      pointerEvents,
      id,
      markerStart,
      markerMid,
      markerEnd,
      mask,
    };

    const finalProps = {
      ...camelAttributes,
      ...removeUndefined(overrideProps),
    };
    const Svg = uce('svg', { ref: svgRef, ...finalProps });

    const containerDefaultStyles = {
      width,
      height,
    };

    const {
      // native events that should be mapped to web events
      onPress: onClick,
      ...finalContainerProps
    } = containerProps;
    return (
      <View
        ref={fowardRef}
        {...finalContainerProps}
        onClick={onClick}
        style={[style, removeUndefined(containerDefaultStyles)]}
      >
        {Svg}
      </View>
    );
  },
);

SvgXml.displayName = 'Svg';

export default SvgXml;

/** polyfill for Node < 12 */
function matchAll(str: string) {
  return (re: RegExp) => {
    const matches = [];
    let groups;
    while ((groups = re.exec(str))) {
      matches.push(groups);
    }
    return matches;
  };
}

function parseSVG(svg: string) {
  const contentMatch = svg.match(/<svg(.*)<\/svg>/ims);
  const content = contentMatch ? contentMatch[1] : '';
  const [, attrs, innerSVG] = content.match(/(.*?)>(.*)/ims) || ['', '', ''];
  const attributes = [
    ...matchAll(attrs)(/([a-z0-9-]+)(=['"](.*?)['"])?/gims),
  ].map(([, key, , value]) => ({ [key]: value }));
  return { attributes, innerSVG };
}

interface ParsedProp {
  [key: string]: unknown;
}

function kebabToCamel(attrs: ParsedProp[]) {
  const camelObj: ParsedProp = {};
  attrs.forEach(attr => {
    const key = Object.keys(attr)[0];
    camelObj[key.replace(/-./g, x => x.toUpperCase()[1])] = attr[key];
  });
  return camelObj;
}

function removeUndefined(obj: ParsedProp) {
  const finalObj: ParsedProp = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      finalObj[key] = obj[key];
    }
  });
  return finalObj;
}
