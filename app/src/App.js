import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AuthLoader, AuthMng, MainMng} from './screens';
import {connect, Provider} from 'react-redux';
import {Platform, NativeModules, StatusBar} from 'react-native';
import store from './store';
import {screens} from './constants';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//var logoW = Dimensions.get('window').width * .85;//Dimensions.get('window').width * .85 > 330 ? 330 : Dimensions.get('window').width * .85;

//Disable warnings box
console.disableYellowBox = true;

if (Platform.OS === 'android'){
    const { UIManager } = NativeModules;

    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
StatusBar.setBarStyle('light-content');
// StatusBar.setTranslucent(true);
// StatusBar.setBackgroundColor('#00000000');

const RootNavigationView = createAppContainer(
    createSwitchNavigator(
        {
            [screens.InitialSetup]: AuthLoader,
            [screens.App]: MainMng,
            [screens.AuthMng]: AuthMng,
        },{
            initialRouteName:screens.InitialSetup,
        }
    )
);

const RootNavigation = connect(state => (state))(RootNavigationView);

const App = () => (
    <Provider store={store}>
        <RootNavigation/>
    </Provider>
);

export default App;
