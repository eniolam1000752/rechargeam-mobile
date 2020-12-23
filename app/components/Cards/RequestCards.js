import React from 'react';
import {Image, Platform, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../assets/colors';
import {icons} from '../../assets/images';
import {Col6, Row} from '../Grid/_Grid';
import {Text} from '../Text/Text';

export function ReqeuestCards({customerName, isRetry, onRetry}) {
  return (
    <View
      style={{
        width: '100%',
        height: 103,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: !isRetry ? colors.primary : '#EB5757',
        shadowColor: colors.black,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 59,
        padding: 12,
      }}>
      <Row style={{height: '100%'}}>
        <Col6>
          <View>
            <Text isComfortaa weight="600" style={{color: 'rgba(0,0,0,0.5)'}}>
              From:{' '}
              <Text isComfortaa style={{opacity: 1}}>
                {customerName}
              </Text>
            </Text>
          </View>
          <View style={{marginTop: 6}}>
            <Text weight="600">08070753122</Text>
          </View>
          <View style={{marginTop: Platform.OS === 'ios' ? 23 : 16}}>
            <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.4)'}} weight="600">
              20-02-2020, 03:00pm
            </Text>
          </View>
        </Col6>
        <Col6 hAlign="right">
          <View>
            <Image source={icons.mtn} />
          </View>
          <View style={{marginTop: isRetry ? 17 : 27}}>
            {isRetry ? (
              <TouchableOpacity onPress={onRetry}>
                <View
                  style={{
                    padding: 7,
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  }}>
                  <Text style={{color: colors.white}}>Retry</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text>Successful</Text>
            )}
          </View>
        </Col6>
      </Row>
    </View>
  );
}
