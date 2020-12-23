import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Feather';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row} from '../../components/Grid/_Grid.js';
import {useController} from './AdminsHook.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {icons} from '../../assets/images';
import {FlatList} from 'react-native-gesture-handler';
import {AddAdminModal} from '../../components/AddAdminModal/AddAdminModal.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors.js';
import {FetchContainer} from 'app-provider';
import {API} from '../../libs/api.js';
function Admins({navigation}) {
  const {state, dispatch} = useController(navigation);

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [gettingAdmins, setGettingAdmins] = useState(true);
  useEffect(() => setGettingAdmins(true), []);

  return (
    <>
      <AddAdminModal
        show={showAddAdmin}
        onAdd={() => {}}
        onDismiss={() => {
          setShowAddAdmin(false);
        }}
      />
      <View style={[appStyles.container]}>
        <Header
          text="Admins"
          hasBack
          hasLogout
          hasMenu
          navigation={navigation}
          onLogoutPressed={() => {
            navigation.navigate(navRoute.login);
          }}
          onMenuPressed={() => {
            navigation.openDrawer();
          }}
        />
        <View style={{flex: 1}}>
          <Row
            style={{
              paddingHorizontal: 15,
              alignItems: 'center',
              marginTop: Platform.OS === 'ios' ? 0 : 20,
              marginBottom: 10,
            }}>
            <Col6>
              <Text isComfortaa style={{fontSize: 13}}>
                Current admins
              </Text>
            </Col6>
            <Col6 hAlign="right">
              <TouchableOpacity
                onPress={() => {
                  setShowAddAdmin(true);
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name={'plus'} size={20} />
                </View>
              </TouchableOpacity>
            </Col6>
          </Row>
          {false ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={icons.emptyAdmin}
                style={{
                  width: 300,
                  height: undefined,
                  aspectRatio: 375 / 233,
                  marginTop: -50,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 15,
              }}>
              <FetchContainer
                noCache
                noRetry
                fire={gettingAdmins}
                saveAs={'admins'}
                defaultComponent={<Text></Text>}
                loadingComponent={
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <ActivityIndicator
                      size={'large'}
                      animating={true}
                      color={colors.black}
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                }
                errorComponent={(err) => (
                  <Text
                    weight="500"
                    style={{fontSize: 16, alignSelf: 'center'}}>
                    {err?.error}
                  </Text>
                )}
                fetchFunction={({onSuccess, onError}) => {
                  API.getAdmins()
                    .then((resp) => {
                      setGettingAdmins(false);
                      onSuccess(resp);
                    })
                    .catch((err) => {
                      setGettingAdmins(false);
                      Alert.alert('Error', err?.error);
                      onError(err);
                    });
                }}>
                {(resp) =>
                  resp.users.map((item, index) => <AdminItem userData={item} />)
                }
              </FetchContainer>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

function AdminItem({userData}) {
  return (
    <View style={styles.adminItemWrapper}>
      <View style={styles.adminItemContent}>
        <View style={styles.adminItemIconWrapper}>
          <IconF name="user" size={34} color={'#777'} />
        </View>
        <TouchableOpacity style={styles.deleteAdminButton}>
          <IconMC name="close" size={20} />
        </TouchableOpacity>
      </View>
      <Text
        style={{fontSize: 12, textAlign: 'center', marginTop: 5}}
        weight="700">
        {userData.name}
      </Text>
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text
          style={{fontSize: 10, textAlign: 'center', opacity: 0.5}}
          weight="700">
          {userData.email}
        </Text>
      </View>
    </View>
  );
}

export {Admins};
