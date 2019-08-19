import AsyncStorage from '@react-native-community/async-storage';

class Auth {
    static AUTH_COMPLETE = 'auth_complete';
    static AUTH_WRONG = 'auth_wrong';
    static AUTH_LOGOUT = 'auth_logout';
    static AUTH_SIGNUP = 'auth_signup';
}

const userInfo = {email:'1', password:'2'};

const auth = async () => {
    const resp = await AsyncStorage.getItem('logged');
    return resp === '1' ? Auth.AUTH_COMPLETE : Auth.AUTH_WRONG;
};

const signIn = async (email, password) => {
    if(email===userInfo.email && password===userInfo.password){
        await AsyncStorage.setItem('logged', '1');
        return Auth.AUTH_COMPLETE;
    }else{
        return Auth.AUTH_WRONG;
    }
};


const signUp = async (email, password, firstName, secondName, phone) => {
    await AsyncStorage.setItem('logged', '1');
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('secondName', secondName);
    await AsyncStorage.setItem('phone', phone);

    return Auth.AUTH_SIGNUP;
};


const logOut = async () => (
    await AsyncStorage.clear().then( () => Auth.AUTH_LOGOUT )
);

export {signIn, logOut, auth, Auth};
