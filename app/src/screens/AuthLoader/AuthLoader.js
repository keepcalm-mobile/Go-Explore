import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import s from './styles';
import {screens} from '../../constants';
import AuthBackground from '../../components/AppBackground';
import { AccessToken } from 'react-native-fbsdk';


class AuthLoader extends React.Component<Props> {
    state = {};

    constructor(props){
        super(props);

        // this._checkAuth(props[ModMap.Auth]);
        // console.log(" AuthLoader : " + JSON.stringify(props));
        // this._auth();

        AccessToken.getCurrentAccessToken().then(r => console.log('>>>> FACEBOOK ACCESS : ' + JSON.stringify(r)));
    }

    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     console.log(" componentWillReceiveProps : " + JSON.stringify(nextProps));
    //     this._checkAuth(nextProps[ModMap.Auth]);
    //     // nextProps.navigation.navigate( nextProps[ModMap.Auth].userInvalidate ? screens.AuthMng : screens.App);
    // }


    render() {
        return (
            <View style={s.container}>
                <AuthBackground/>
                <ActivityIndicator size={'small'} color={'#FFFFFF'}/>
                <Text style={[s.welcome, s.row]}>Loading</Text>
            </View>
        );
    }

    // _checkAuth(iAuth) {
    //     if(iAuth === undefined || iAuth.userIsReading) return;
    //     this.props.navigation.navigate(iAuth.userInvalidate ? screens.AuthMng : screens.App);
    // }

    static getDerivedStateFromProps(props, state) {
        if (!props.userIsReading) {
            props.navigation.navigate(props.userInvalidate ? screens.AuthMng : screens.App);
        }
        return null;
    }

    // _auth = async () => {
    //     console.log("AuthLoader !1");
    //     const logged = await auth();
    //     this.props.dispatch({ type: 'LOADER_COMPLETE' });
    //     this.props.navigation.navigate(logged !== Auth.AUTH_COMPLETE ? screens.AuthMng : screens.App);
    // }
}

export default AuthLoader;
