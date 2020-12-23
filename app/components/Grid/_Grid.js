import React from 'react';
import {View, StyleSheet} from 'react-native';

const Row = ({children, style}) => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        ...style,
      }}>
      {children && children.length
        ? children.map((child, item) => child)
        : children}
    </View>
  );
};
const Col1 = ({children, hAlign}) => (
  <View
    style={{
      width: '8.3333333333333333%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col2 = ({children, hAlign}) => (
  <View
    style={{
      width: '16.6666666666666666667%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col3 = ({children, hAlign}) => (
  <View
    style={{
      width: '25%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col4 = ({children, hAlign}) => (
  <View
    style={{
      width: '33.333333333333333333%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col5 = ({children, hAlign}) => (
  <View
    style={{
      width: '41.6666666666666666666666667%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col6 = ({children, hAlign}) => (
  <View
    style={{
      width: '50%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col7 = ({children, hAlign}) => (
  <View
    style={{
      width: '58.3333333333333333333333333%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col8 = ({children, hAlign}) => (
  <View
    style={{
      width: '66.666666666666666666666666666666666667%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col9 = ({children, hAlign}) => (
  <View
    style={{
      width: '75%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col10 = ({children, hAlign}) => (
  <View
    style={{
      width: '83.3333333333333333333333333333333%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col11 = ({children, hAlign}) => (
  <View
    style={{
      width: '91.666666666666666666666666666667‬%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const Col12 = ({children, hAlign}) => (
  <View
    style={{
      width: '100%',
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);
const ColFlex = ({children, hAlign}) => (
  <View
    style={{
      display: 'flex',
      flex: 1,
      alignItems:
        hAlign === 'left' || !hAlign
          ? 'flex-start'
          : hAlign === 'center'
          ? 'center'
          : 'flex-end',
    }}>
    {children}
  </View>
);

const VSpace = ({value}) => <View style={{paddingVertical: value || 10}} />;

export {
  Row,
  Col1,
  Col2,
  Col3,
  Col4,
  Col5,
  Col6,
  Col7,
  Col8,
  Col9,
  Col10,
  Col11,
  Col12,
  ColFlex,
  VSpace,
};
