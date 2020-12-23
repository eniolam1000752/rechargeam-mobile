import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import {Col12, Col6, ColFlex, Row} from '../Grid/_Grid.js';
import {Text} from '../Text/Text.js';
import {navRoute} from '../../navigation/navRoute.js';
import {AppContext} from 'app-provider';

function Header({
  text,
  hasMenu,
  onMenuPressed,
  hasLogout,
  hasAddAdmin,
  onLogoutPressed,
  onAddAdmin,
  onBack,
  navigation,
  smallText,
}) {
  const {dispatch: appDispatch, saveAs} = useContext(AppContext);

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: 120,
          justifyContent: 'center',
        }}>
        <Row
          style={{
            height: 36,
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: Platform.OS === 'android' ? 20 : 0,
          }}>
          <Col6>
            {(onBack || hasMenu) && (
              <TouchableOpacity onPress={onBack || onMenuPressed}>
                <View style={{width: 40, height: 40}}>
                  <IconSL name={onBack ? 'arrow-left' : 'menu'} size={25} />
                </View>
              </TouchableOpacity>
            )}
          </Col6>
          <Col6 hAlign="right">
            <Row style={{justifyContent: 'flex-end'}}>
              {hasAddAdmin && (
                <TouchableOpacity onPress={onAddAdmin}>
                  <View style={{height: 40, alignItems: 'center'}}>
                    <IconI name="md-person-add-outline" size={20} />
                    <Text
                      isComfortaa
                      style={{fontSize: 10, marginTop: 10, opacity: 0.5}}>
                      Add Admin
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {hasLogout && (
                <TouchableOpacity
                  style={{marginLeft: 20}}
                  onPress={() => {
                    saveAs('loggedIn', false);
                    appDispatch('loggedIn', false);
                    navigation.replace(navRoute.login);
                    onLogoutPressed();
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
              )}
            </Row>
          </Col6>
        </Row>
        <Row
          style={{
            marginTop:
              !hasAddAdmin && !hasLogout
                ? 0
                : Platform.OS === 'android'
                ? 10
                : 20,
          }}>
          <Col12 hAlign="center">
            {
              <Text
                isComfortaa
                weight="600"
                style={{fontSize: smallText ? 25 : 32}}>
                {text}
              </Text>
            }
          </Col12>
        </Row>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export {Header};
