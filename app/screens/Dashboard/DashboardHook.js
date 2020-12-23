import {useFocusEffect} from '@react-navigation/native';
import {AppContext} from 'app-provider';
import React, {useReducer, useEffect, useContext, useCallback} from 'react';
import {Keyboard, PermissionsAndroid} from 'react-native';
import USSD from 'react-native-ussd';
import {create} from 'react-test-renderer';
import {API} from '../../libs/api';
import {globals} from '../../libs/globals';
import {
  airtimeParser,
  dataParser,
  getNetworkFromDisplayName,
  ussdCodes,
} from '../../libs/helper';

function useController(navigation) {
  const {saveAs, getSaveAs, simCards, dispatch: appDispatch} = useContext(
    AppContext,
  );

  const initState = {
    pin: '',
    showContinue: true,
    simCards: null,
    airtimeSim: {},
    dataSim: {},
    simProcessors: [],
  };
  const [state, dispatch] = useReducer(
    (state, data) => ({...state, ...data}),
    initState,
  );

  useEffect(() => {
    dispatch({
      simCards,
      airtimeSim: {...state.airtimeSim, airtimeBalance: null},
      dataSim: {...state.airtimeSim, airtimeBalance: null},
    });
  }, [simCards]);

  //@init()
  const initFunc = () => {
    let showHandler = Keyboard.addListener('keyboardDidShow', () => {
      dispatch({showContinue: false});
    });
    let hideHandler = Keyboard.addListener('keyboardDidHide', () => {
      dispatch({showContinue: true});
    });
    settingsManager();
    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  };

  useEffect(() => {
    if (state.simCards?.airtime && state.simCards?.data) {
      const airtimeNetwork = getNetworkFromDisplayName(
        state.simCards.airtime?.displayName,
      );
      const dataNetwork = getNetworkFromDisplayName(
        state.simCards.data?.displayName,
      );
      console.log(airtimeNetwork, dataNetwork);
      // setTimeout(() => {
      USSD.dial(
        ussdCodes.airtime[airtimeNetwork] || '',
        state.simCards.airtime.subscriptionId,
      )
        .then((resp) => {
          const {ussdReply} = resp;
          const airtimeBalance = airtimeParser(ussdReply, airtimeNetwork);
          const dataBalance = dataParser(ussdReply, airtimeNetwork);

          console.log('USSD RESP: ', airtimeBalance, ussdReply);
          dispatch({
            airtimeSim: {...state.airtimeSim, airtimeBalance, dataBalance},
          });
        })
        .catch((err) => console.log('unable to get airtime balance: ', err));

      USSD.dial(
        ussdCodes.airtime[dataNetwork] || '',
        state.simCards.data.subscriptionId,
      )
        .then((resp) => {
          const {ussdReply} = resp;
          const airtimeBalance = airtimeParser(ussdReply, dataNetwork);
          const dataBalance = dataParser(ussdReply, dataNetwork);

          console.log('USSD RESP: ', airtimeBalance, ussdReply);
          dispatch({
            dataSim: {...state.dataSim, airtimeBalance, dataBalance},
          });
        })
        .catch((err) => console.log('unable to get airtime balance: ', err));
      // }, 2000);
    }
  }, [state.simCards]);

  const settingsManager = () => {
    console.log('uning settitng maager');
    const createSettings = (justSimCard) => {
      USSD.getAllSimInfo()
        .then((resp) => {
          const settings = {
            simCards: {airtime: {}, data: {}},
            debitUssdSchemas: [],
            balanceUssdSchema: [],
          };
          if (resp.length >= 2) {
            settings.simCards.airtime = resp?.[0];
            settings.simCards.data = resp?.[1];
          } else if (resp.length === 1) {
            settings.simCards.data = settings.simCards.airtime = resp?.[0];
          }

          return settings;
        })
        .then((settings) => {
          const payload = justSimCard
            ? {simCards: settings.simCards}
            : settings;

          console.log('settings ====> ', settings);

          API.saveSettings(payload)
            .then((resp) => {
              console.log('settings has been saved ', resp);
            })
            .catch((err) => {
              console.log('Error saving settings: ', err);
            });
          saveAs('simCardSettings', settings.simCards);
          dispatch({simCards: settings.simCards});
          appDispatch({simCards: settings.simCards});
        })
        .catch((err) => {
          console.log('gettins sim card info: ', err);
          console.log(err);
        });
    };

    // const simCards = getSaveAs('simCardSettings');
    USSD.getAllSimInfo()
      .then((resp) => {
        console.log('SIMCARDS HERE => ', resp);

        const simCards = {airtime: {}, data: {}};

        if (resp.length >= 2) {
          simCards.airtime = resp?.[0];
          simCards.data = resp?.[1];
        } else if (resp.length === 1) {
          simCards.data = simCards.airtime = resp?.[0];
        }
        if (simCards) {
          dispatch({simCards});
          appDispatch({simCards});
        } else {
          createSettings(true);
        }
      })
      .catch((err) => console.log('unable to get sim', err));
  };

  const getBalance = () => {
    USSD.getAllSimInfo()
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  return {state, dispatch, getBalance};
}

export {useController};
