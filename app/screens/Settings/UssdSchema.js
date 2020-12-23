import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FetchContainer} from 'app-provider';

import {Header} from '../../components/Header/Header.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row, VSpace} from '../../components/Grid/_Grid.js';
import {Button} from '../../components/Button/Button.js';

import {navRoute} from '../../navigation/navRoute.js';
import {API} from '../../libs/api.js';
import {appStyles} from '../../assets/appStyles.js';
import {icons} from '../../assets/images';
import {colors} from '../../assets/colors.js';

import {useController} from './SettingsHook.js';
import {styles} from './styles.js';
import {ManageSchemaModal} from '../../components/ManageSchemaModal/ManageSchemaModal.js';

function UssdSchema({navigation, route}) {
  const {state, dispatch} = useController(navigation);

  const [showManageUssd, setShowManageUssd] = useState(false);
  const [gettingAdmins, setGettingAdmins] = useState(true);

  //@state
  let isEdit = false;

  //@init()
  const onMount = () => {};

  return (
    <>
      <ManageSchemaModal
        show={showManageUssd}
        isEdit={isEdit}
        onAdd={() => {}}
        onDismiss={() => {
          setShowManageUssd(false);
        }}
      />
      <View style={[appStyles.container]}>
        <Header
          text="USSD Managment"
          hasLogout
          smallText
          navigation={navigation}
          onLogoutPressed={() => {
            navigation.navigate(navRoute.login);
          }}
          onMenuPressed={() => {
            navigation.openDrawer();
          }}
          onBack={() => {
            navigation.goBack();
          }}
        />
        <View style={{flex: 1}}>
          <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
            {/* <FetchContainer
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
              </FetchContainer> */}
            {/* <Row style={styles.addTextDescription}>
              <Col6>
                <Text isComfortaa style={{fontSize: 12, opacity: 0.6}}>
                  USSD codes for Balance
                </Text>
              </Col6>
              <Col6 hAlign="right">
                <TouchableOpacity onPress={() => setShowManageUssd(true)}>
                  <View style={styles.addIconWrapper}>
                    <Icon name={'plus'} size={20} />
                  </View>
                </TouchableOpacity>
              </Col6>
            </Row> */}
            {/* {false ? (
              <Text style={styles.emptyContentText}>
                You have no USSD code schemas to check balance
              </Text>
            ) : (
              <View style={styles.ussdSchemasWrapper}>
                {[1, 2].map((item, index) => (
                  <SchemaItem
                    key={'ussd_schema_' + index}
                    noActions
                    item={item}
                    setShowManageUssd={setShowManageUssd}
                  />
                ))}
              </View>
            )} */}
            <VSpace value={5} />
            <Row style={styles.addTextDescription}>
              <Col6>
                <Text isComfortaa style={{fontSize: 12, opacity: 0.6}}>
                  USSD codes for value debit
                </Text>
              </Col6>
              <Col6 hAlign="right">
                <TouchableOpacity
                  onPress={() => {
                    isEdit = false;
                    setShowManageUssd(true);
                  }}>
                  <View style={styles.addIconWrapper}>
                    <Icon name={'plus'} size={20} />
                  </View>
                </TouchableOpacity>
              </Col6>
            </Row>
            {false ? (
              <Text style={styles.emptyContentText}>
                You have no USSD code schemas to check balance
              </Text>
            ) : (
              <View style={styles.ussdSchemasWrapper}>
                {[1, 2, 3].map((item, index) => (
                  <SchemaItem
                    key={'ussd_schema_' + index}
                    item={item}
                    setShowManageUssd={setShowManageUssd}
                    onEdit={() => {
                      setShowManageUssd(true);
                      isEdit = true;
                    }}
                    onDelete={() => {}}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

function SchemaItem({item, setShowManageUssd, noActions, onEdit, onDelete}) {
  const deleteSchema = () => {
    Alert.alert(
      'Alert',
      'You are about to delete an Airtime(MTN) USSD schema',
      [{text: 'Cancel'}, {text: 'Continue', onPress: onDelete}],
    );
  };

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        paddingHorizontal: 14,
        marginVertical: 22,
        alignSelf: 'center',
      }}
      onPress={item.onPress}>
      <Row style={{alignItems: 'center'}}>
        <Col6>
          <Text style={{fontSize: 16, marginBottom: 8}} weight="600">
            {/* {item.title} */}Airtime (MTN)
          </Text>
        </Col6>
        <Col6>
          {!noActions && (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-end',
              }}>
              <Button small isRound onPress={deleteSchema} bColor={colors.red}>
                <IconMC name="delete-outline" size={20} color={colors.white} />
              </Button>
              <View style={{width: 10}} />
              <Button small isRound onPress={onEdit}>
                <IconMC name="pencil-outline" size={18} />
              </Button>
            </View>
          )}
        </Col6>
      </Row>

      <View style={{marginTop: 5}}>
        <Text weight="300" style={{fontSize: 12, opacity: 0.8}}>
          <Text weight="600">USSD code: </Text>
          {/* {item.subTitle} */} {' *123*3<AMOUNT>*45*<NUMBER>#'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export {UssdSchema};
