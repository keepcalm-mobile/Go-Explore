import AsyncStorage from "@react-native-community/async-storage";

class Auth {
    static AUTH_COMPLETE = 'auth_complete';
    static AUTH_WRONG = 'auth_wrong';
    static AUTH_LOGOUT = 'auth_logout';
}

const userInfo = {email:'1', password:'2'};

const signIn = async (email, password) => {
    if(email===userInfo.email && password===userInfo.password){
        await AsyncStorage.setItem('logged', '1');
        return Auth.AUTH_COMPLETE;
        // this.props.navigation.navigate('App');
    }else{
        return Auth.AUTH_WRONG;
    }
};

const logOut = async () => {
    await AsyncStorage.clear();
    return Auth.AUTH_LOGOUT;
    // this.props.navigation.navigate('Auth');
};

export {signIn, logOut, Auth};