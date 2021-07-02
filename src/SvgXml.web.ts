import React from 'react';
import {
  createElement as oldCreateElement,
  unstable_createElement,
} from 'react-native-web';
import { ViewProps, StyleSheet } from 'react-native';
import useElementLayout from 'react-native-web/src/hooks/useElementLayout';
import usePlatformMethods from 'react-native-web/src/hooks/usePlatformMethods';
import useResponderEvents from 'react-native-web/src/hooks/useResponderEvents';
import setAndForwardRef from 'react-native-web/src/modules/setAndForwardRef';
import pick from 'react-native-web/src/modules/pick';

import {
  ClipProps,
  Color,
  FillProps,
  NumberProp,
  ResponderProps,
  StrokeProps,
  TransformProps,
} from './lib/extract/types';

const createElement = oldCreateElement || unstable_createElement;

const forwardPropsList = {
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessible: true,
  children: true,
  classList: true,
  color: true,
  disabled: true,
  importantForAccessibility: true,
  nativeID: true,
  onBlur: true,
  onClick: true,
  onClickCapture: true,
  onContextMenu: true,
  onFocus: true,
  onKeyDown: true,
  onKeyUp: true,
  opacity: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true,
  pointerEvents: true,
  preserveAspectRatio: true,
  ref: true,
  style: true,
  testID: true,
  viewBox: true,
  x: true,
  y: true,
  width: true,
  height: true,
  // unstable
  dataSet: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseUp: true,
  onScroll: true,
  onWheel: true,
  href: true,
  rel: true,
  target: true,
};

const pickProps = props => pick(props, forwardPropsList);

const styles = StyleSheet.create({
  svg: {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'black',
    flexBasis: 'auto',
    flexShrink: 0,
    display: 'flex',
    boxSizing: 'border-box',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0,
  },
});

type SvgProps = {
  color?: Color;
  viewBox?: string;
  opacity?: NumberProp;
  preserveAspectRatio?: string;
  xml: string;
} & TransformProps &
  ResponderProps &
  StrokeProps &
  FillProps &
  ClipProps &
  ViewProps;

const Svg = React.forwardRef<HTMLOrSVGElement, SvgProps>(
  (props: SvgProps, forwardedRef) => {
    const {
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      style,
      xml,
    } = props;
    const hostRef = React.useRef(null);
    const setRef = setAndForwardRef({
      getForwardedRef: () => forwardedRef,
      setLocalRef: hostNode => {
        hostRef.current = hostNode;
      },
    });

    const classList = [styles.svg];

    useElementLayout(hostRef, onLayout);
    usePlatformMethods(hostRef, classList, style);
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
    });

    const { attributes, innerSVG } = React.useMemo(() => parseSVG(xml), [xml]);
    const supportedProps = React.useMemo(() => {
      const finalProps = pickProps({ ...attributes, ...props });
      finalProps.classList = classList;
      finalProps.ref = setRef;
      finalProps.style = style;
      finalProps.xmlns = 'http://www.w3.org/2000/svg';
    }, [props, attributes, classList, setRef, style]);
    React.useLayoutEffect(() => {
      if (!hostRef.current) {
        return;
      }
      (hostRef.current as HTMLDivElement).innerHTML = innerSVG;
    }, [innerSVG, hostRef]);

    return createElement('svg', supportedProps);
  },
);

Svg.displayName = 'Svg';

export default Svg;

/** polyfill for Node < 12 */
function matchAll(str) {
  return re => {
    const matches = [];
    let groups;
    while ((groups = re.exec(str))) {
      matches.push(groups);
    }
    return matches;
  };
}

function parseSVG(svg: string) {
  const content = svg.match(/<svg(*.)<\/svg>/ims)[1];
  const [, attrs, innerSVG] = content.match(/(.*?)>(.*)/ims);
  const attributes = [
    ...matchAll(attrs)(/([a-z0-9]+)(=['"](.*?)['"])?[\s>]/gims),
  ].map(([, key, , value]) => ({ [key]: value }));
  return { attributes, innerSVG };
}
