import React from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../../assets/colors';

function InputText(props) {
  const {value, onChangeText, onFocus, onBlur} = props;
  return (
    <View style={{width: '100%', height: 60}}>
      <TextInput
        {...props}
        style={{
          width: '100%',
          flex: 1,
          paddingTop: 20,
          fontFamily: 'Comfortaa',
        }}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          onFocus?.();
        }}
        onBlur={() => {
          onBlur?.();
        }}
      />
      <View
        style={{
          height: 3.1,
          backgroundColor: colors.primary,
          width: '100%',
          borderRadius: 10,
        }}
      />
    </View>
  );
}

export {InputText};
