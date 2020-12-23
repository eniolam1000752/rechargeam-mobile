import React from 'react';
import {Text as _Text} from 'react-native';
import {colors} from '../../assets/colors.js';

function Text(props) {
  const {children, style, isComfortaa, weight} = props;
  return (
    <_Text
      {...props}
      style={[
        {color: colors.black},
        style,
        {
          fontFamily: isComfortaa
            ? 'Comfortaa'
            : weight === '100'
            ? 'Montserrat-ExtraLight'
            : weight === '200'
            ? 'Montserrat-Thin'
            : weight === '300'
            ? 'Montserrat-Light'
            : weight === '400'
            ? 'Montserrat-Regular'
            : weight === '500'
            ? 'Montserrat-Medium'
            : weight === '600'
            ? 'Montserrat-Bold'
            : weight === '700'
            ? 'Montserrat-ExtraBold'
            : weight === '800'
            ? 'Montserrat-Black'
            : 'Montserrat-Regular',

          fontWeight: weight,
        },
      ]}>
      {children}
    </_Text>
  );
}

export {Text};
