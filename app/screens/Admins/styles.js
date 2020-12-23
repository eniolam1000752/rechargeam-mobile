import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  contentWrapper: {
    width: '100%',
    marginBottom: 30,
  },
  bottomContentWrapper: {
    width: '100%',
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  simcardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 34,
  },
  adminItemWrapper: {
    width: 100,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
  },
  adminItemContent: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminItemIconWrapper: {
    width: 67,
    height: 67,
    borderRadius: 50,
    borderWidth: 0.7,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAdminButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 7,
    right: 7,
    elevation: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
  },
});
