/**
 *
 * @flow
 */

export function getNetworkFromDisplayName(name: String) {
  if (/[M|m][T|t][N|n]/g.test(name)) {
    return 'mtn';
  } else if (/[g|G][L|l][O|o]/g.test(name)) {
    return 'glo';
  } else if (/9[M|m][o|O][b|B][i|I][L|l][e|E]/g.test(name)) {
    return '9mobile';
  } else if (/airtel/g.test(name?.toLowerCase())) {
    return 'airtel';
  } else {
    return '?';
  }
}

export const ussdCodes = {
  airtime: {
    mtn: '*556#',
    glo: '*124#',
    '9mobile': '*232#',
    airtel: '*!23#',
  },
  data: {},
};

export function airtimeParser(message, network) {
  if (network === 'mtn') {
    return message
      .match(/Account\s*\:\s*-?N?\d+\.?\d*/g)?.[0]
      ?.replace(/Account\s*\:\s*/g, '')
      .replace(/N/, '');
  }
}
export function dataParser(message, network) {
  if (network === 'mtn') {
    return message
      .match(/Balance\s*\:\s*-?\d+\.?\d*MB/g)?.[0]
      ?.replace(/Balance\s*\:\s*/g, '');
  }
}
