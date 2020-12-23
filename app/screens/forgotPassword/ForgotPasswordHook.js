import React, {useReducer, useEffect} from 'react';
import {Keyboard} from 'react-native';

function useController(navigation) {
  const initState = {showContinue: true, email: ''};

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

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  const login = () => {};

  return {login, state, dispatch};
}

export {useController};
