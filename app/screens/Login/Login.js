import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row} from '../../components/Grid/_Grid.js';
import {useController} from './LoginHook.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {InputText} from '../../components/InputText/InputText.js';

function Login({navigation}) {
  const {state, dispatch, onBiometricsLogin, login} = useController(navigation);

  return (
    <View style={[appStyles.container]}>
      <Header text="Sign in" />
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.contentWrapper}>
          <View style={{width: '85%', alignSelf: 'center', marginBottom: 60}}>
            <InputText
              value={state.username}
              placeholder="Username"
              onChangeText={(username) => {
                dispatch({username});
              }}
            />
          </View>
          <Text isComfortaa style={{marginBottom: 12, opacity: 0.6}}>
            Provide your 4 digit pin
          </Text>
          <PinInput
            value={state.pin}
            digitLength={4}
            onChangeText={(pin) => {
              dispatch({pin});
            }}
            onKeyPress={() => {
              Alert.alert('pressed');
            }}
          />
          {state.showContinue && (
            <View style={{width: '80%', alignSelf: 'center', marginTop: 70}}>
              <Button text="Login" onPress={() => login()} />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {state.showContinue && (
        <SafeAreaView>
          <View style={styles.bottomContentWrapper}>
            <Row style={{alignItems: 'center'}}>
              <Col6>
                <TouchableOpacity
                  onPress={() => navigation.navigate(navRoute.forgotPassword)}>
                  <Text
                    isComfortaa
                    weight="800"
                    style={{padding: 10, paddingLeft: 0}}>
                    Forgot PIN
                  </Text>
                </TouchableOpacity>
              </Col6>
              <Col6 hAlign="right">
                {state.bioMetrySupported && (
                  <Button text="Login" isRound onPress={onBiometricsLogin}>
                    <IconMC name="fingerprint" size={35} />
                  </Button>
                )}
              </Col6>
            </Row>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

export {Login};
