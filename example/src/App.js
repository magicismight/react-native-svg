import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  ForeignObject,
  G,
  Image,
  Line,
  LinearGradient,
  Marker,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  Text,
  TSpan,
  Use,
} from 'react-native-svg';

const styles = StyleSheet.create({
  space: { height: 40 },
});

const Space = () => <View style={styles.space} />;

export const App = () => (
  <ScrollView>
    <Space />

    <Svg height="100" width="100" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"
      />

      <Rect
        x="15"
        y="15"
        width="70"
        height="70"
        stroke="red"
        strokeWidth="2"
        fill="yellow"
      />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Rect x="0" y="0" width="100" height="100" fill="black" />
      <Circle cx="50" cy="50" r="30" fill="yellow" />
      <Circle cx="40" cy="40" r="4" fill="black" />
      <Circle cx="60" cy="40" r="4" fill="black" />
      <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
    </Svg>

    <Space />

    <Svg
      width="130"
      height="130"
      fill="blue"
      stroke="red"
      color="green"
      viewBox="-16 -16 544 544"
    >
      <Path
        d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
        strokeWidth="32"
      />
      <Path d="M0,0L512,512" stroke="currentColor" strokeWidth="32" />
    </Svg>

    <Space />

    <Svg width="200" height="60">
      <Rect
        x="25"
        y="5"
        width="150"
        height="50"
        fill="rgb(0,0,255)"
        strokeWidth="3"
        stroke="rgb(0,0,0)"
      />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Circle cx="50" cy="50" r="50" fill="pink" />
    </Svg>

    <Space />

    <Svg height="100" width="110">
      <Ellipse
        cx="55"
        cy="55"
        rx="50"
        ry="30"
        stroke="purple"
        strokeWidth="2"
        fill="yellow"
      />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="2" />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Polygon
        points="40,5 70,80 25,95"
        fill="lime"
        stroke="purple"
        strokeWidth="1"
      />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Polyline
        points="10,10 20,12 30,20 40,60 60,70 95,90"
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Path
        d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
        fill="none"
        stroke="red"
      />
    </Svg>

    <Space />

    <Svg height="60" width="200">
      <Text
        fill="none"
        stroke="purple"
        fontSize="20"
        fontWeight="bold"
        x="100"
        y="20"
        textAnchor="middle"
      >
        STROKED TEXT
      </Text>
    </Svg>

    <Space />

    <Svg height="160" width="200">
      <Text y="20" dx="5 5">
        <TSpan x="10">tspan line 1</TSpan>
        <TSpan x="10" dy="15">
          tspan line 2
        </TSpan>
        <TSpan x="10" dx="10" dy="15">
          tspan line 3
        </TSpan>
      </Text>
      <Text x="10" y="60" fill="red" fontSize="14">
        <TSpan dy="5 10 20">12345</TSpan>
        <TSpan fill="blue" dy="15" dx="0 5 5">
          <TSpan>6</TSpan>
          <TSpan>7</TSpan>
        </TSpan>
        <TSpan dx="0 10 20" dy="0 20" fontWeight="bold" fontSize="12">
          89a
        </TSpan>
      </Text>
      <Text y="140" dx="0 5 5" dy="0 -5 -5">
        delta on text
      </Text>
    </Svg>

    <Space />

    <Svg height="100" width="200">
      <G rotation="50" origin="100, 50">
        <Line x1="60" y1="10" x2="140" y2="10" stroke="#060" />

        <Rect x="60" y="20" height="50" width="80" stroke="#060" fill="#060" />

        <Text x="100" y="75" stroke="#600" fill="#600" textAnchor="middle">
          Text grouped with shapes
        </Text>
      </G>
    </Svg>

    <Space />

    <Svg height="100" width="300">
      <Defs>
        <G id="shape">
          <G>
            <Circle cx="50" cy="50" r="50" />
            <Rect x="50" y="50" width="50" height="50" />
            <Circle cx="50" cy="50" r="5" fill="blue" />
          </G>
        </G>
      </Defs>
      <Use href="#shape" x="20" y="0" />
      <Use href="#shape" x="170" y="0" />
    </Svg>

    <Space />

    <Svg height="150" width="110">
      <Symbol id="symbol" viewBox="0 0 150 110" width="100" height="50">
        <Circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          stroke="red"
          fill="red"
        />
        <Circle
          cx="90"
          cy="60"
          r="40"
          strokeWidth="8"
          stroke="green"
          fill="white"
        />
      </Symbol>

      <Use href="#symbol" x="0" y="0" />
      <Use href="#symbol" x="0" y="50" width="75" height="38" />
      <Use href="#symbol" x="0" y="100" width="50" height="25" />
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Defs>
        <ClipPath id="clip">
          <Circle cx="50%" cy="50%" r="40%" />
        </ClipPath>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="red" />
      <Rect x="5%" y="5%" width="50%" height="90%" />

      <Image
        x="5%"
        y="5%"
        width="50%"
        height="90%"
        preserveAspectRatio="xMidYMid slice"
        opacity="0.5"
        href="https://picsum.photos/200/200"
        clipPath="url(#clip)"
      />
      <Text
        x="50"
        y="50"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="16"
        fill="blue"
      >
        HOGWARTS
      </Text>
    </Svg>

    <Space />

    <Svg height="100" width="100">
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#ff0" stopOpacity="1" />
          <Stop offset="100%" stopColor="#00f" stopOpacity="1" />
        </RadialGradient>
        <ClipPath id="clip">
          <G scale="0.9" x="10">
            <Circle cx="30" cy="30" r="20" />
            <Ellipse cx="60" cy="70" rx="20" ry="10" />
            <Rect x="65" y="15" width="30" height="30" />
            <Polygon points="20,60 20,80 50,70" />
            <Text
              x="50"
              y="30"
              fontSize="32"
              fonWeight="bold"
              textAnchor="middle"
              scale="1.2"
            >
              Q
            </Text>
          </G>
        </ClipPath>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="url(#grad)"
        clipPath="url(#clip)"
      />
    </Svg>

    <Space />

    <Svg height="150" width="300">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
    </Svg>

    <Space />

    <Svg height="150" width="300">
      <Defs>
        <RadialGradient
          id="grad"
          cx="150"
          cy="75"
          rx="85"
          ry="55"
          fx="150"
          fy="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#ff0" stopOpacity="1" />
          <Stop offset="1" stopColor="#83a" stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
    </Svg>

    <Space />

    <Svg width="400" height="150" viewBox="0 0 800 300">
      <Defs>
        <LinearGradient
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="800"
          y2="0"
        >
          <Stop offset="0" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" stopOpacity="1" />
        </LinearGradient>
        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="800"
          height="300"
        >
          <Rect x="0" y="0" width="800" height="300" fill="url(#Gradient)" />
        </Mask>
        <Text
          id="Text"
          x="400"
          y="200"
          fontFamily="Verdana"
          fontSize="100"
          textAnchor="middle"
        >
          Masked text
        </Text>
      </Defs>
      <Rect x="0" y="0" width="800" height="300" fill="#FF8080" />
      <Use href="#Text" fill="blue" mask="url(#Mask)" />
      <Use href="#Text" fill="none" stroke="black" stroke-width="2" />
    </Svg>

    <Space />

    <Svg width="200" height="100" viewBox="0 0 800 400">
      <Defs>
        <Pattern
          id="TrianglePattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
          viewBox="0 0 10 10"
        >
          <Path d="M 0 0 L 7 0 L 3.5 7 z" fill="red" stroke="blue" />
        </Pattern>
      </Defs>
      <Rect fill="none" stroke="blue" x="1" y="1" width="798" height="398" />
      <Ellipse
        fill="url(#TrianglePattern)"
        stroke="black"
        strokeWidth="5"
        cx="400"
        cy="200"
        rx="350"
        ry="150"
      />
    </Svg>

    <Space />

    <Svg width="400" height="200" viewBox="0 0 4000 2000">
      <Defs>
        <Marker
          id="Triangle"
          viewBox="0 0 10 10"
          refX="0"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="4"
          markerHeight="3"
          orient="auto"
        >
          <Path d="M 0 0 L 10 5 L 0 10 z" />
        </Marker>
      </Defs>
      <Rect
        x="10"
        y="10"
        width="3980"
        height="1980"
        fill="none"
        stroke="blue"
        strokeWidth="10"
      />
      <Path
        d="M 1000 750 L 2000 750 L 2500 1250"
        fill="none"
        stroke="black"
        strokeWidth="100"
        markerEnd="url(#Triangle)"
      />
    </Svg>

    <Space />

    <Svg width="400" height="150">
      <Defs>
        <LinearGradient
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="800"
          y2="0"
        >
          <Stop offset="0" stopColor="white" stopOpacity="0.2" />
          <Stop offset="1" stopColor="white" stopOpacity="1" />
        </LinearGradient>
        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="800"
          height="300"
        >
          <Rect x="0" y="0" width="800" height="300" fill="url(#Gradient)" />
        </Mask>
      </Defs>
      <G mask="url(#Mask)">
        <Circle cx={50} cy={70} r={65} />
        <ForeignObject x={50} y={0} width={100} height={100}>
          <View style={{ width: 200, height: 400, transform: [] }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri: 'https://picsum.photos/200/200',
              }}
            />
          </View>
        </ForeignObject>
        <ForeignObject x={55} y={5} width={100} height={100}>
          <View style={{ width: 200, height: 400, transform: [] }}>
            <Text style={{ color: 'blue' }}>Testing</Text>
            <Text style={{ color: 'green' }}>Testing2</Text>
          </View>
        </ForeignObject>
      </G>
    </Svg>

    <Space />
  </ScrollView>
);
