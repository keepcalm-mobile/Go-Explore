import {createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import { AuthLoader, AuthMng, HomeScreen }  from "../../app/src/screens";

// const AppStack = createStackNavigator({Home: HomeScreen});
// const AuthStack = createStackNavigator({Login: AuthMng});//createStackNavigator

const Navigation = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoader: AuthLoader,
            App: HomeScreen,
            Auth: AuthMng
        },{
            initialRouteName:'AuthLoader'
        }
  )
);



export default Navigation;
//
// import React from 'react';
// import T from 'prop-types';
// import { Font, AppLoading } from 'expo';
// import { withHandlers } from 'recompose';
// import { appOperations } from '../modules/app';
// import Navigator from './RootNavigator';
//
// const NavigatorView = ({
//      dispatch,
//      navigator,
//      isAuth,
//      asyncJob,
//      finishJob,
//      jobError,
//    }) => (
//        isAuth ? (
//            <Navigator navigation={{ dispatch: dispatch, state: navigator }} />
//            ) : (
//                <AppLoading
//                    startAsync={asyncJob}
//                    onFinish={finishJob}
//                    onError={jobError}
//                />
//                )
// );
//
// NavigatorView.propTypes = {
//   dispatch: T.func,
//   navigator: T.object,
//   isAuth: T.bool,
//   asyncJob: T.func,
//   finishJob: T.func,
//   jobError: T.func,
// };
//
// const enhance = withHandlers({
//   asyncJob: () => () => Promise.all([
//     Font.loadAsync({
//       'gill-sans': require('../assets/fonts/GillSans.ttf'), // eslint-disable-line global-require
//     }),
//   ]),
//   finishJob: props => () => props.dispatch(appOperations.imagesLoaded(true)),
//   jobError: props => error => {
//     console.warn(error);
//     props.dispatch(appOperations.imagesLoaded(true));
//   },
// });
//
// export default enhance(NavigatorView);
