import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import s from './styles';
// import {auth, Auth} from "../../api/Auth";
import {screens} from '../../constants';
import {ModMap} from '../../modules';
import AuthBackground from '../../components/AppBackground';



class AuthLoader extends React.Component<Props> {
    state = {};

    constructor(props){
        super(props);

        // this._checkAuth(props[ModMap.Auth]);
        // console.log(" AuthLoader : " + JSON.stringify(props));
        // this._auth();
    }

    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     console.log(" componentWillReceiveProps : " + JSON.stringify(nextProps));
    //     this._checkAuth(nextProps[ModMap.Auth]);
    //     // nextProps.navigation.navigate( nextProps[ModMap.Auth].didInvalidate ? screens.AuthMng : screens.App);
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
    //     if(iAuth === undefined || iAuth.isReading) return;
    //     this.props.navigation.navigate(iAuth.didInvalidate ? screens.AuthMng : screens.App);
    // }

    static getDerivedStateFromProps(props, state) {
        if (props[ModMap.Auth] !== undefined && !props[ModMap.Auth].isReading) {
            props.navigation.navigate(props[ModMap.Auth].didInvalidate ? screens.AuthMng : screens.App);
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
