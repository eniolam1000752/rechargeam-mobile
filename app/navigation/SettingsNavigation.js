import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login/Login';
import {navRoute} from './navRoute';
import {Settings} from '../screens/Settings/Settings';
import {SimCardSettings} from '../screens/Settings/SimcardSettings';
import {UssdSchema} from '../screens/Settings/UssdSchema';

const RootStack = createStackNavigator();
export function SettingsNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={navRoute.mainSettings}
      screenOptions={{header: null, headerShown: false}}>
      <RootStack.Screen name={navRoute.mainSettings} component={Settings} />
      <RootStack.Screen
        name={navRoute.airtimeSimSettings}
        component={SimCardSettings}
      />
      <RootStack.Screen name={navRoute.ussdSchema} component={UssdSchema} />
    </RootStack.Navigator>
  );
}
