import { connect } from 'react-redux';
import { AuthLoader, AuthMng, HomeScreen }  from "../../app/src/screens";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

import NavigatorView from './RootNavigatorView';
const mapStateToProps = ({ navigator }) => test;
//     ({
//   navigator,
//   isAuth: app.isAuthComplete,
// });

let test = function (navigator){
  console.log("test1 : " + JSON.stringify(navigator));
// console.log("test2 : " + JSON.stringify(navigator2));

return { navigator }
};

// const NavigatorContainer = connect(state => ({ count: state.count }))(NavigatorView);//connect(mapStateToProps)(NavigatorView);
const NavigatorContainer = connect(mapStateToProps)(NavigatorView);

export default NavigatorContainer;
