import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {colors} from '../../assets/colors.js';

function PinInput({value, onChangeText, digitLength, onKeyPress}) {
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <SmoothPinCodeInput
        placeholder={<View style={styles.digitWrapper}></View>}
        mask={
          <View style={styles.digitWrapper}>
            <View style={styles.dot} />
          </View>
        }
        maskDelay={1000}
        password={true}
        cellStyle={null}
        cellStyleFocused={null}
        value={value || ''}
        codeLength={digitLength}
        onTextChange={onChangeText || (() => {})}
        animationFocused="pulse"
        animated={true}
        cellSpacing={25}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  digitWrapper: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.black,
    backgroundColor: colors.grey,
  },
  digitImage: {position: 'absolute', transform: [{scale: 0.43}]},
  dot: {
    width: 10,
    height: 10,
    backgroundColor: colors.black,
    borderRadius: 20,
  },
});

export {PinInput};
