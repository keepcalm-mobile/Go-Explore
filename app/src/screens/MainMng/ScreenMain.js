import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ButtonOrange from "../../components/ButtonOrange";
import {Auth, logOut} from "../../api/Auth";
import {scale} from "../../utils/resize";

class HomeScreen extends React.Component{
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to GoExplore City</Text>
                <ButtonOrange onPress={this._logOut} title={'LOGOUT'}/>
            </View>
        );
    }

    _logOut = async () => {
        const resp = await logOut();
        if(Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    welcome: {
        // position: 'absolute',
        left: '5.6%',
        fontFamily: 'Poppins-Bold',
        fontSize: scale(24),
        lineHeight: 36,
        color: '#FFFFFF',
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },
});

export default HomeScreen;