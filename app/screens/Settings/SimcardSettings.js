import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Platform, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col12, Col6, Row, VSpace} from '../../components/Grid/_Grid.js';
import {useController} from './SettingsHook.js';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/colors.js';
import {icons} from '../../assets/images/index.js';
import {AppContext} from 'app-provider';
import USSD from 'react-native-ussd';
import {getNetworkFromDisplayName} from '../../libs/helper.js';

function SimCardSettings({navigation, route}) {
  const {getSaveAs, saveAs, dispatch: appDispatch, simCards} = useContext(
    AppContext,
  );
  const {state, dispatch} = useController(navigation, route);
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  const [presentSim, setPresentSim] = useState(null);
  const [phoneSims, setPhoneSims] = useState([]);
  const [selectedSim, setSelectedSim] = useState({});

  useEffect(() => {
    // const simCards = getSaveAs('simCardSettings');
    if (simCards) {
      setPresentSim(simCards[state.isAirtimeSettings ? 'airtime' : 'data']);
      setSelectedSim(simCards[state.isAirtimeSettings ? 'airtime' : 'data']);
    }
    USSD.getAllSimInfo().then((resp) => {
      console.log('response here => ', resp);
      setPhoneSims(resp);
    });
  }, [state.isAirtimeSettings]);

  const selectSimAndSave = (phoneSim) => {
    setSelectedSim(phoneSim);
    // const simCardSettings = getSaveAs('simCardSettings');
    setPresentSim(phoneSim);
    saveAs(
      'simCardSettings',
      state.isAirtimeSettings
        ? {...simCards, airtime: phoneSim}
        : {...simCards, data: phoneSim},
    );
    appDispatch({
      simCards: state.isAirtimeSettings
        ? {...simCards, airtime: phoneSim}
        : {...simCards, data: phoneSim},
    });
  };

  return (
    <View style={[appStyles.container]}>
      <View style={styles.contentWrapper}>
        <SafeAreaView>
          <Row style={{marginTop: 20}}>
            <Col12 hAlign="right">
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 40,
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <IconMC name="close" size={35} />
              </TouchableOpacity>
            </Col12>
          </Row>
        </SafeAreaView>
        <ScrollView
          style={{
            width: '100%',
            marginTop: Platform.OS === 'android' ? 20 : 0,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <View style={styles.simCardWrapper}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={icons.simCard} />
              <Text style={{position: 'absolute', fontSize: 18}} weight="800">
                {presentSim?.simSlotIndex + 1 + ''}
              </Text>
              <Text style={styles.carrierName} weight="600">
                {getNetworkFromDisplayName(presentSim?.displayName || '')}
              </Text>
            </View>
            {console.log(state.isAirtimeSettings)}
            <Text
              weight="600"
              style={{fontSize: 12, marginTop: 20, color: '#777'}}>
              Present SIM for{' '}
              <Text weight={'600'}>
                {state.isAirtimeSettings ? 'Airtime' : 'Data'}
              </Text>
            </Text>
          </View>

          <Text weight="300" style={styles.textHeader}>
            Select a SIM that would be dialed for your{' '}
            {state.isAirtimeSettings ? 'airtime' : 'data'}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',
            }}>
            {phoneSims.map((item, index) => (
              <TouchableOpacity
                key={'phone_sim_item_' + index}
                style={[
                  styles.simCardWrapper,
                  {marginHorizontal: 40, width: null},
                ]}
                onPress={() => selectSimAndSave(item)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={icons.simCard} />
                  {item.subscriptionId === selectedSim.subscriptionId && (
                    <View style={styles.dotIndicator} />
                  )}
                  <Text
                    style={{position: 'absolute', fontSize: 18}}
                    weight="800">
                    {item?.simSlotIndex + 1 + ''}
                  </Text>
                </View>
                <Text weight="600" style={{fontSize: 12, marginTop: 10}}>
                  {getNetworkFromDisplayName(item?.displayName || '')}
                </Text>
              </TouchableOpacity>
            ))}
            {/* <Col6 hAlign="center">
              <TouchableOpacity
                style={styles.simCardWrapper}
                onPress={() => setIsLeftSelected(true)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={icons.simCard} />
                  {isLeftSelected && <View style={styles.dotIndicator} />}
                  <Text
                    style={{position: 'absolute', fontSize: 18}}
                    weight="800">
                    1
                  </Text>
                </View>
                <Text weight="600" style={{fontSize: 12, marginTop: 10}}>
                  GLO
                </Text>
              </TouchableOpacity>
            </Col6>
            <Col6 hAlign="center">
              <TouchableOpacity
                style={styles.simCardWrapper}
                onPress={() => setIsLeftSelected(false)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={icons.simCard} />
                  {!isLeftSelected && <View style={styles.dotIndicator} />}
                  <Text
                    style={{position: 'absolute', fontSize: 18}}
                    weight="800">
                    2
                  </Text>
                </View>
                <Text weight="600" style={{fontSize: 12, marginTop: 10}}>
                  MTN
                </Text>
              </TouchableOpacity>
            </Col6> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export {SimCardSettings};
