import { createStackNavigator } from 'react-navigation';

import screens from '../../app/src/constants/screens';
import { SettingsScreen } from '../../app/src/screens';
import AppNavigator from './AppNavigator';


const Routes = {
  [screens.InitialSetup]: {
    screen: createStackNavigator({
      initial: {
        screen: SettingsScreen,
        navigationOptions: {
          title: 'Initial setup',
          headerLeft: null,
        },
      },
    }),
  },
  [screens.App]: {
    screen: AppNavigator,
  },
};

export default createStackNavigator(Routes, { initialRouteName: screens.App, headerMode: 'none' });


