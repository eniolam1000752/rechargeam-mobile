import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContentWrapper: {
    width: '100%',
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  simCardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carrierName: {
    position: 'absolute',
    fontSize: 9,
    bottom: 4,
  },
  dotIndicator: {
    width: 16,
    height: 16,
    borderRadius: 20,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -4,
    right: -6,
  },
  textHeader: {
    width: 230,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 30,
    fontSize: 12,
    opacity: 0.8,
  },
  ussdSchemasWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  emptyContentText: {
    width: '90%',
    fontSize: 11,
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 30,
    color: colors.primary,
    alignSelf: 'center',
  },
  addTextDescription: {
    paddingHorizontal: 19,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 34,
    marginBottom: 10,
  },
  addIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
