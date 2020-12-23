import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row} from '../../components/Grid/_Grid.js';
import {useController} from './DashboardHook.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {icons} from '../../assets/images';
import {FlatList} from 'react-native-gesture-handler';
import {ReqeuestCards} from '../../components/Cards/RequestCards.js';
import {color} from 'react-native-reanimated';
import {colors} from '../../assets/colors.js';
import {AppContext} from 'app-provider';
import {globals} from '../../libs/globals.js';
import {getNetworkFromDisplayName} from '../../libs/helper.js';

function Dashboard({navigation}) {
  const {loggedIn, saveAs, dispatch: appDispatch} = useContext(AppContext);
  const {state, dispatch, getBalance} = useController(navigation);

  return (
    <View style={[appStyles.container]}>
      <Header
        text="Dashboard"
        hasMenu
        hasAddAdmin
        hasLogout
        onMenuPressed={() => {
          navigation.openDrawer();
        }}
        navigation={navigation}
        onLogoutPressed={() => {}}
        onAddAdmin={() => {
          navigation.navigate(navRoute.admins);
        }}
      />
      <View
        style={[
          styles.contentWrapper,
          {marginTop: Platform.OS === 'ios' ? 0 : 30},
        ]}>
        <Row>
          <Col6 hAlign="left">
            {state?.simCards?.airtime ? (
              <TouchableOpacity
                style={styles.simcardWrapper}
                onPress={() => {
                  navigation.navigate(navRoute.airtimeSimSettings, {
                    params: {isAirtimeSettings: true},
                  });
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={icons.simCard} />
                    <Text
                      style={{position: 'absolute', fontSize: 18}}
                      weight="800">
                      {state?.simCards.airtime?.simSlotIndex + 1 + ''}
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        fontSize: 10,
                        bottom: 4,
                      }}
                      weight="800">
                      {getNetworkFromDisplayName(
                        state?.simCards.airtime?.displayName,
                      )}
                    </Text>
                  </View>
                  <Text weight="800" style={{fontSize: 12, marginTop: 10}}>
                    airtime
                  </Text>

                  <Text style={{fontSize: 10}} weight="300">
                    (click to edit)
                  </Text>
                </View>
                <View style={{marginLeft: 0, marginTop: -33}}>
                  <Text weight="600" style={{fontSize: 13}}>
                    {(state.airtimeSim?.airtimeBalance ? '# ' : '') +
                      (state.airtimeSim?.airtimeBalance || '* * * * *')}
                  </Text>
                  <Text weight="600" style={{marginTop: 3, fontSize: 13}}>
                    {state.airtimeSim?.dataBalance || '* * * *'}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{width: '100%', alignItems: 'center'}}>
                <ActivityIndicator
                  size={'large'}
                  animating={true}
                  color={colors.black}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 15,
                    opacity: 0.5,
                    textAlign: 'center',
                  }}>
                  Getting Airtime SIM
                </Text>
              </View>
            )}
          </Col6>
          <Col6 hAlign="left">
            {state?.simCards?.data ? (
              <TouchableOpacity
                style={styles.simcardWrapper}
                onPress={() => {
                  navigation.navigate(navRoute.airtimeSimSettings, {
                    params: {isAirtimeSettings: false},
                  });
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={icons.simCard} />
                    <Text
                      style={{position: 'absolute', fontSize: 18}}
                      weight="800">
                      {state?.simCards.data?.simSlotIndex + 1 + ''}
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        fontSize: 10,
                        bottom: 4,
                      }}
                      weight="800">
                      {getNetworkFromDisplayName(
                        state?.simCards.data?.displayName,
                      )}
                    </Text>
                  </View>
                  <Text weight="800" style={{fontSize: 12, marginTop: 10}}>
                    data
                  </Text>

                  <Text style={{fontSize: 10}} weight="300">
                    (click to edit)
                  </Text>
                </View>
                <View style={{marginLeft: 0, marginTop: -33}}>
                  <Text weight="600" style={{fontSize: 13}}>
                    {(state.dataSim?.airtimeBalance ? '# ' : '') +
                      (state.dataSim?.airtimeBalance || '* * * * *')}
                  </Text>
                  <Text weight="600" style={{marginTop: 3, fontSize: 13}}>
                    {state.dataSim?.dataBalance || '* * * *'}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{width: '100%', alignItems: 'center'}}>
                <ActivityIndicator
                  size={'large'}
                  animating={true}
                  color={colors.black}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 15,
                    opacity: 0.5,
                    textAlign: 'center',
                  }}>
                  Getting Data SIM
                </Text>
              </View>
            )}
          </Col6>
        </Row>
      </View>
      <View style={{flex: 1}}>
        <Row
          style={{
            paddingHorizontal: 15,
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : 20,
            marginBottom: 10,
            marginTop: Platform.OS === 'ios' ? 0 : -16,
          }}>
          <Col6>
            <Text isComfortaa style={{fontSize: 13}}>
              Customers requests
            </Text>
          </Col6>
          <Col6 hAlign="right">
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>4</Text>
            </View>
          </Col6>
        </Row>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: 'hidden',
            elevation: 20,
            backgroundColor: colors.white,
          }}>
          <FlatList
            data={[1, 2, 3, 5, 6, 7]}
            renderItem={({item, index}) => (
              <ReqeuestCards
                customerName="Eniola olatunji"
                isRetry={item === 1}
                onRetry={getBalance}
              />
            )}
            contentContainerStyle={{
              paddingHorizontal: 14,
              paddingTop: 10,
            }}
            ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
            ListFooterComponent={() => <View style={{marginVertical: 50}} />}
            style={{borderTopRightRadius: 20, borderTopLeftRadius: 20}}
          />
        </View>
      </View>
    </View>
  );
}

export {Dashboard};
