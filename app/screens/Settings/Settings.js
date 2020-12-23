import React from 'react';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row} from '../../components/Grid/_Grid.js';
import {useController} from './SettingsHook.js';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {ScrollView} from 'react-native-gesture-handler';

function Settings({navigation}) {
  const {state, dispatch} = useController(navigation);

  return (
    <View style={[appStyles.container]}>
      <Header
        text="Settings"
        hasMenu
        navigation={navigation}
        onMenuPressed={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.contentWrapper}>
          <ScrollView
            style={{
              width: '100%',
              marginTop: Platform.OS === 'android' ? 20 : 0,
            }}>
            {[
              {
                title: 'Change airtime SIM card',
                subTitle:
                  'Change default SIM from which airtime purchases would be carried out from',
                onPress: () => {
                  navigation.navigate(navRoute.airtimeSimSettings, {
                    isAirtimeSettings: true,
                  });
                },
              },
              {
                title: 'Change data SIM card',
                subTitle:
                  'Change default SIM from which data purchases would be careid out from',
                onPress: () => {
                  navigation.navigate(navRoute.airtimeSimSettings);
                },
              },
              {
                title: 'USSD code schemas',
                subTitle:
                  'Mange USSD codes that would be diald during the processing of airtime or data',
                onPress: () => {
                  navigation.navigate(navRoute.ussdSchema);
                },
              },
            ].map((item, index) => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                  marginVertical: 20,
                }}
                onPress={item.onPress}>
                <Text style={{fontSize: 15, marginBottom: 8}} weight="600">
                  {item.title}
                </Text>
                <View>
                  <Text weight="300" style={{fontSize: 12, opacity: 0.8}}>
                    {item.subTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export {Settings};
