import {AppContext} from 'app-provider';
import React, {useReducer, useEffect, useContext} from 'react';
import {Alert, Keyboard} from 'react-native';
import TouchID from 'react-native-touch-id';
import {API} from '../../libs/api';
import {globals} from '../../libs/globals';
import {navRoute} from '../../navigation/navRoute';
import * as Keychain from 'react-native-keychain';
import {colors} from '../../assets/colors';

function useController(navigation) {
  const {touchEnabled, dispatch: appDispatch, getSaveAs, saveAs} = useContext(
    AppContext,
  );

  const initState = {
    pin: '',
    username: '',
    showContinue: true,
    bioMetrySupported: false,
    tempEnableLoginByBio: false,
  };
  const [state, dispatch] = useReducer(
    (state, data) => ({...state, ...data}),
    initState,
  );

  useEffect(() => {
    let showHandler = Keyboard.addListener('keyboardDidShow', () => {
      dispatch({showContinue: false});
    });
    let hideHandler = Keyboard.addListener('keyboardDidHide', () => {
      dispatch({showContinue: true});
    });
    isTouchSupported();

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  const isTouchSupported = () => {
    console.log(TouchID);
    TouchID.isSupported()
      .then((biometryType) => {
        if (biometryType === 'FaceID') {
          console.log(biometryType);
          appDispatch({bioMetrySupported: true, biometricType: biometryType});
          dispatch({bioMetrySupported: true});
        } else if (biometryType === 'TouchID') {
          console.log(biometryType);
          appDispatch({bioMetrySupported: true, bioMetrytype: 'Fingerprint'});
          dispatch({bioMetrySupported: true});
        } else if (biometryType) {
          console.log('biometyr supported: ', biometryType);
          appDispatch({bioMetrySupported: true, bioMetrytype: 'Fingerprint'});
          dispatch({bioMetrySupported: true});
        }
      })
      .catch((error) => {
        console.log('not biometry available', error);
        dispatch({bioMetrySupported: false});
      });
  };

  const login = (uname, p) => {
    let {username, pin} = state;
    username = uname || username;
    pin = p || pin;

    console.log(username, pin);

    appDispatch({isLoading: true});
    API.login({username, pin, deviceId: globals.deviceId})
      .then((resp) => {
        appDispatch({isLoading: false, loggedIn: true});
        saveAs('loggedIn', true);
        setTimeout(() => saveAs('token', resp.token), 2000);
        globals.token = resp.token;
        if (state.tempEnableLoginByBio) {
          console.log('saving data in keychaing', Keychain);
          Keychain.setGenericPassword(username, pin);
          appDispatch({touchEnabled: true});
          saveAs('touchEnabled', true);
        }

        Keychain.setGenericPassword(username, pin);
        navigation.replace(navRoute.dashboard);
      })
      .catch((err) => {
        appDispatch({isLoading: false});
        Alert.alert('Error', err.message);
      });
  };

  const onBiometricsLogin = () => {
    const isTouchEnabled = getSaveAs('touchEnabled');
    if (isTouchEnabled) {
      const touchConfig = {
        title: 'Authentication Required',
        imageColor: colors.primary,
        imageErrorColor: 'red',
        sensorErrorDescription: 'Failed',
        cancelText: 'Cancel',
      };
      TouchID.authenticate(
        'Place your finger on your fingerprint scanner to continue',
        touchConfig,
      )
        .then((resp) => {
          Keychain.getGenericPassword()
            .then(({username, password}) => {
              login(username, password);
            })
            .catch((err) =>
              console.log('unable to get data in keychaing => ', err),
            );
        })
        .catch((err) => {
          console.log('finger print failed: ', err);
        });
    } else {
      Alert.alert(
        'Biometrics Login',
        'Would you like to enable biometrics login ?',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch({tempEnableLoginByBio: true});
            },
          },
          {text: 'CANCEL'},
        ],
      );
    }
  };

  return {login, state, dispatch, onBiometricsLogin};
}

export {useController};
