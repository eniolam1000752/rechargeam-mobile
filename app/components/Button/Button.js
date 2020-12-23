import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import {Text} from '../Text/Text';

function Button({text, onPress, children, isRound, small, bColor}) {
  return isRound ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: small ? 30 : 63,
        height: small ? 30 : 63,
        borderRadius: 50,
        // elevation: 5,
        backgroundColor: bColor || colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: colors.black,
        // shadowOpacity: 0.3,
        // shadowOffset: {width: 2, height: 4},
        // shadowRadius: 26,
      }}>
      {children || (
        <Text weight="800" style={{fontSize: 16}}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        height: 63,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 26,
      }}>
      {children || (
        <Text weight="800" style={{fontSize: 16}}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export {Button};
