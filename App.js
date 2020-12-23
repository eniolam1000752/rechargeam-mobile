/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
  StatusBar,
  View,
} from 'react-native';
import {AppContext, AppProvider} from 'app-provider';

import {RootNavigatior} from './app/navigation/RootNavigation';
import {colors} from './app/assets/colors';
import {Text} from './app/components/Text/Text';
import {API} from './app/libs/api';
import {globals} from './app/libs/globals';

const App = () => {
  const initData = {
    loginData: {},
    isLoading: false,
    bioMetrySupported: false,
    biometricType: null,
    touchEnabled: false,
    loggedIn: false,
    simCards: {},
  };

  useEffect(() => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE)
      .then((resp) => {
        console.log('permission successful', resp);
        if (!resp) {
          return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              title: 'Request phone call permission',
              message:
                'Rechargeam would like to request phon call permsission so that USSD calls can be made',
            },
          );
        }
      })
      .then((resp) => {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        )
          .then((resp) => {
            console.log('location permission successful', resp);
            if (!resp) {
              return PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                  title: 'Request Coarsed Location permission',
                  message:
                    'Rechargeam would like to request location permsission so that USSD calls can be made',
                },
              );
            }
          })
          .then((resp) => {
            console.log('phone state permission granted');
          });
      })
      .catch((err) => console.log('error ==> ', err));
  }, []);

  return (
    <AppProvider initData={initData}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Loader />
      <RootNavigatior />
    </AppProvider>
  );
};

const Loader = () => {
  const {isLoading, dispatch: appDispatch, loggedIn, getSaveAs} = useContext(
    AppContext,
  );

  useEffect(() => {
    if (!loggedIn) registerDevice();
    globals.token = getSaveAs('token');
  }, []);

  const registerDevice = () => {
    appDispatch({isLoading: true});
    API.registerDevice({
      deviceModel: globals.deviceModel,
      deviceId: globals.deviceId,
      pushToken: 'jksjdkfjskf',
    })
      .then((resp) => {
        appDispatch({isLoading: false});
      })
      .catch((error) => {
        appDispatch({isLoading: false});
      });
  };

  return (
    <Modal visible={isLoading} transparent={true}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.94)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={colors.primary}
        />
        <Text
          isComfortaa
          style={{
            color: colors.black,
            marginTop: 30,
            fontWeight: 'bold',
          }}></Text>
      </View>
    </Modal>
  );
};

export default App;
