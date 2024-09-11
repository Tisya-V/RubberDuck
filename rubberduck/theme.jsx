import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
//   myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    rdlightblue : '#8ECFEA',
    rdmidblue : '#71A3B9',
    rddarkblue : '#38667A',
    rdlightyellow : '#F4E496',
    rddarkyellow : '#DCB209',
    rdgrey : '#D9D9D9'
  }
};

export default theme;