import {useFocusEffect} from '@react-navigation/native';
import React, {useReducer, useEffect, useCallback} from 'react';
import {Keyboard} from 'react-native';

function useController(navigation, route) {
  const initState = {pin: '', showContinue: true, isAirtimeSettings: true};
  const [state, dispatch] = useReducer(
    (state, data) => ({...state, ...data}),
    initState,
  );

  useFocusEffect(
    useCallback(() => {
      console.log(
        route,
        Boolean(
          route?.params?.isAirtimeSettings ||
            route?.params?.params?.isAirtimeSettings,
        ),
      );
      dispatch({
        isAirtimeSettings: Boolean(
          route?.params?.isAirtimeSettings ||
            route?.params?.params?.isAirtimeSettings,
        ),
      });
    }, [route]),
  );

  useEffect(() => {
    let showHandler = Keyboard.addListener('keyboardDidShow', () => {
      dispatch({showContinue: false});
    });
    let hideHandler = Keyboard.addListener('keyboardDidHide', () => {
      dispatch({showContinue: true});
    });

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  const login = () => {};

  return {login, state, dispatch};
}

export {useController};
