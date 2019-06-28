import React from 'react';
import {createSwitchNavigator, createStackNavigator, createAppContainer, createNavigationContainer} from "react-navigation";
import HomeScreen from "./screens/main/ScreenMain";
import {AuthLoadingScreen, LoginMng} from "./screens/auth/LoginMng";


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//var logoW = Dimensions.get('window').width * .85;//Dimensions.get('window').width * .85 > 330 ? 330 : Dimensions.get('window').width * .85;


const AppStack = createStackNavigator({Home: HomeScreen});
// const AuthStack = createStackNavigator({Login: LoginMng});//createStackNavigator



export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: LoginMng
        },{
            initialRouteName:'AuthLoading'
        }
    )
)
