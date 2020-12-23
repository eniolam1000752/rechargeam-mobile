import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login/Login';
import {navRoute} from './navRoute';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import {DashboardNavigator} from './DashboardNavigation';
import {ForgotPassword} from '../screens/forgotPassword/ForgotPassword';
import {AppContext} from 'app-provider';
import {globals} from '../libs/globals';

const RootStack = createStackNavigator();
export function RootNavigatior() {
  const {getSaveAs, loggedIn} = useContext(AppContext);
  const [hasLoggedIn, setHasLoggedIn] = useState(getSaveAs('loggedIn'));

  useEffect(() => {
    setHasLoggedIn(loggedIn);
  }, [loggedIn]);

  console.log(hasLoggedIn);

  return (
    <NavigationContainer
      ref={(ref) => {
        globals.rootNavigator = ref;
      }}>
      <RootStack.Navigator
        initialRouteName={hasLoggedIn ? navRoute.dashboard : navRoute.login}
        screenOptions={{header: null, headerShown: false}}>
        <>
          <RootStack.Screen name={navRoute.login} component={Login} />
          <RootStack.Screen
            name={navRoute.forgotPassword}
            component={ForgotPassword}
          />
        </>
        <RootStack.Screen
          name={navRoute.dashboard}
          component={DashboardNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
