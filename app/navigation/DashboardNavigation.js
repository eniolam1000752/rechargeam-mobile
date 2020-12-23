import React from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IconAnt from 'react-native-vector-icons/AntDesign';

import {navRoute} from './navRoute';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import {Admins} from '../screens/Admins/Admins.js';
import {colors} from '../assets/colors';
import {Text} from '../components/Text/Text';
import {icons} from '../assets/images';
import {Settings} from '../screens/Settings/Settings';
import {SettingsNavigator} from './SettingsNavigation';
import {SimCardSettings} from '../screens/Settings/SimcardSettings';

const DashboardDrawer = createDrawerNavigator();
const DashboardStack = createStackNavigator();
export function DashboardNavigator() {
  return (
    <DashboardDrawer.Navigator
      initialRouteName={navRoute.dashboard}
      screenOptions={{header: null, headerShown: false}}
      //   hideStatusBar={true}
      drawerContent={DrawerContent}
      drawerStyle={{
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 5,
        shadowColor: colors.black,
        shadowOpacity: 0.2,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 35,
        width: '76%',
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <DashboardDrawer.Screen name={navRoute.dashboard} component={Dashboard} />
      <DashboardDrawer.Screen name={navRoute.admins} component={Admins} />
      <DashboardDrawer.Screen
        name={navRoute.settings}
        component={SettingsNavigator}
      />
      <DashboardStack.Screen
        name={navRoute.airtimeSimSettings}
        component={SimCardSettings}
      />
    </DashboardDrawer.Navigator>
  );
}

const DrawerContent = (props) => {
  console.log(props);

  return (
    <>
      <View>
        {props.state.routes.map((item, index) => {
          const isActive = index === props.state.index;
          return (
            item.name !== navRoute.airtimeSimSettings && (
              <TouchableOpacity
                key={'drawer_item_' + index}
                onPress={() => {
                  props.navigation.navigate(item.name);
                  props.navigation.closeDrawer();
                }}
                style={{
                  width: '90%',
                  height: 40,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: !isActive ? 12 : 0,
                  marginBottom: 15,
                }}>
                <Image
                  source={
                    index === 0
                      ? isActive
                        ? icons.hspeedometer
                        : icons.speedometer
                      : index === 1
                      ? isActive
                        ? icons.hadmin
                        : icons.admin
                      : isActive
                      ? icons.hsettings
                      : icons.settings
                  }
                  style={{
                    marginBottom: Platform.OS === 'ios' ? 5 : 0,
                    marginRight: 12,
                  }}
                />
                <Text
                  isComfortaa
                  style={{
                    fontSize: index === props.state.index ? 24 : 18,
                    color:
                      index === props.state.index
                        ? colors.primary
                        : colors.black,
                    opacity: index === props.state.index ? 1 : 0.6,
                  }}
                  weight="600">
                  {item.name === navRoute.dashboard
                    ? 'Dashboard'
                    : item.name === navRoute.admins
                    ? 'Manage admins'
                    : item.name === navRoute.settings
                    ? 'Settings'
                    : ''}
                </Text>
              </TouchableOpacity>
            )
          );
        })}
      </View>
      <View style={{position: 'absolute', bottom: 60, right: 24}}>
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => {
            props.navigation.navigate(navRoute.login);
          }}>
          <View style={{height: 40, alignItems: 'center'}}>
            <IconAnt name="poweroff" size={20} />
            <Text
              isComfortaa
              style={{fontSize: 10, marginTop: 10, opacity: 0.5}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
