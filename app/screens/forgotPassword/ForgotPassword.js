import React, {useState} from 'react';
import {ActivityIndicator, Alert, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import {appStyles} from '../../assets/appStyles.js';
import {Header} from '../../components/Header/Header.js';
import {PinInput} from '../../components/PinInput/Pininput.js';
import {Text} from '../../components/Text/Text.js';
import {Col6, Row, VSpace} from '../../components/Grid/_Grid.js';
import {useController} from './ForgotPasswordHook.js';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';
import {Button} from '../../components/Button/Button.js';
import {styles} from './styles.js';
import {navRoute} from '../../navigation/navRoute.js';
import {InputText} from '../../components/InputText/InputText.js';
import {FetchContainer} from 'app-provider';
import {colors} from '../../assets/colors.js';
import {API} from '../../libs/api.js';

function ForgotPassword({navigation}) {
  const {state, dispatch} = useController(navigation);

  const [sending, setSending] = useState(false);

  return (
    <View style={[appStyles.container]}>
      <Header
        text="Forgot PIN"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.contentWrapper}>
          <Text
            isComfortaa
            style={{
              marginBottom: 20,
              opacity: 0.6,
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 25,
            }}>
            A new PIN would be sent to the provided email address
          </Text>
          <VSpace value={10} />
          <InputText
            placeholder="Email"
            value={state.email}
            onChangeText={(email) => dispatch({email})}
            editable={!sending}
          />
          <View style={{width: '88%', alignSelf: 'center', marginTop: 60}}>
            <Button
              onPress={() => {
                if (state.email.trim().length === 0) {
                  Alert.alert('Error', 'Email field cannot be empty');
                  return;
                }
                if (
                  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
                    state.email,
                  )
                ) {
                  Alert.alert('Error', 'Invalid email address');
                  return;
                }
                setSending(true);
              }}>
              <FetchContainer
                noCache
                noRetry
                fire={sending}
                saveAs={'addAdmins'}
                defaultComponent={
                  <Text weight="800" style={{fontSize: 16}}>
                    SEND
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
                  API.forgetPassword({email: state.email})
                    .then((resp) => {
                      onSuccess(resp);
                      setSending(false);
                      Alert.alert(
                        'Success',
                        'PIN reset was successful. Visit your email to retrive your pin',
                      );
                    })
                    .catch((err) => {
                      setSending(false);
                      Alert.alert('Error', err.error);
                      onError(err);
                    });
                }}>
                {() => (
                  <Text weight="800" style={{fontSize: 16}}>
                    SEND
                  </Text>
                )}
              </FetchContainer>
            </Button>
          </View>
          <VSpace value={10} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export {ForgotPassword};
