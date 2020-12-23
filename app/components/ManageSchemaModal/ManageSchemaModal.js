import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../assets/colors';
import {Col12, Row, VSpace} from '../Grid/_Grid';
import {Text} from '../Text/Text';
import {Button} from '../Button/Button';
import {InputText} from '../InputText/InputText';
import {FetchContainer} from 'app-provider';
import {API} from '../../libs/api';
import {emailRegex} from '../../libs/globals';

function ManageSchemaModal({onAdd, show, onDismiss, isEdit}) {
  const [addingAdmin, setAddinAdmin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: colors.white,
          opacity: 0.96,
        }}>
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
                onPress={onDismiss || (() => {})}>
                <IconMC name="close" size={35} />
              </TouchableOpacity>
            </Col12>
          </Row>
        </SafeAreaView>
        <KeyboardAwareScrollView
          contentContainerStyle={{justifyContent: 'flex-end', flex: 1}}>
          <SafeAreaView>
            <View
              style={{
                width: '97%',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginBottom: 30,
                alignSelf: 'center',
              }}>
              <Text isComfortaa style={{fontSize: 25}} weight="600">
                {isEdit ? 'Edit' : 'Add'} Ussd Schema
              </Text>
              <Text style={{fontSize: 10, marginVertical: 16}} weight="400">
                {'USSD code sample format:  *123*<AMOUNT>*<NUMBER>#'}
              </Text>
              <VSpace value={10} />
              <InputText
                value={name}
                placeholder="Process type"
                onChangeText={(name) => setName(name)}
                editable={!addingAdmin}
                type="option"
                options={[]}
                onSelect={() => {}}
              />
              <VSpace value={13} />
              <InputText
                value={email}
                placeholder="Mobile operator"
                onChangeText={(email) => setEmail(email)}
                editable={!addingAdmin}
              />
              <VSpace value={20} />
              <View style={{width: '100%'}}>
                <Text style={{opacity: 0.5}}>USSD code format</Text>
              </View>
              <InputText
                value={email}
                // placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                editable={!addingAdmin}
              />
              <View style={{width: '88%', alignSelf: 'center', marginTop: 40}}>
                <Button
                  onPress={() => {
                    if (email.trim().length === 0) {
                      Alert.alert('Error', 'Email field cannot be empty');
                      return;
                    }
                    if (name.trim().length === 0) {
                      Alert.alert('Error', 'Name field cannot be empty');
                      return;
                    }

                    if (
                      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
                        email,
                      )
                    ) {
                      Alert.alert('Error', 'Invalid email address');
                      return;
                    }
                    setAddinAdmin(true);
                  }}>
                  <FetchContainer
                    noCache
                    noRetry
                    fire={addingAdmin}
                    saveAs={'addAdmins'}
                    defaultComponent={
                      <Text weight="800" style={{fontSize: 16}}>
                        ADD
                      </Text>
                    }
                    loadingComponent={
                      <ActivityIndicator
                        size={'large'}
                        animating={true}
                        color={colors.black}
                      />
                    }
                    errorComponent={() => (
                      <Text weight="800" style={{fontSize: 16}}>
                        Retry
                      </Text>
                    )}
                    fetchFunction={({onSuccess, onError}) => {
                      API.addAdmin({name, email})
                        .then((resp) => {
                          onSuccess(resp);
                          setAddinAdmin(false);
                          onDismiss();
                        })
                        .catch((err) => {
                          setAddinAdmin(false);
                          Alert.alert('Error', err.error);
                          onError(err);
                        });
                    }}>
                    {() => (
                      <Text weight="800" style={{fontSize: 16}}>
                        {isEdit ? 'ADD' : 'Edit'}
                      </Text>
                    )}
                  </FetchContainer>
                </Button>
              </View>
              <VSpace value={10} />
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

export {ManageSchemaModal};
