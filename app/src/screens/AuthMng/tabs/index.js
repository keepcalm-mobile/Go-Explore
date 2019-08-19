import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import ForgotTab from './ForgotTab';
import OtpTab from './OtpTab';
import TermsTab from './TermsTab';
import {ModMap} from '../../../modules';
import {login, restorePassword, registration, confirmPhone, termsAgree} from '../../../modules/reg';


/***    LOGIN   ***/
LoginTab.propTypes = {
    login: PropTypes.func.isRequired,
    registration: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

const loginStateToProps = (state) => {
    return {
        isSuccess: state[ ModMap.Reg ].loginSuccess,
    };
};

const loginDispatchToProps = (dispatch) => {
    return {
        login: (iUser) => dispatch(login(iUser)),
        registration: (iData) => dispatch(registration(iData)),
    };
};

const LoginScreen = connect(loginStateToProps, loginDispatchToProps)(LoginTab);



/***    SIGN UP   ***/
SignupTab.propTypes = {
    registration: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

const signUpStateToProps = (state) => {
    return {
        isSuccess: state[ ModMap.Reg ].registrationSuccess,
    };
};

const signUpDispatchToProps = (dispatch) => {
    return {
        registration: (iData) => dispatch(registration(iData)),
    };
};

const SignupScreen = connect(signUpStateToProps, signUpDispatchToProps)(SignupTab);



/***    FORGOT   ***/
ForgotTab.propTypes = {
    restore: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

const forgotStateToProps = (state) => {
    return {
        isSuccess: state[ ModMap.Reg ].restoreSuccess,
    };
};

const forgotDispatchToProps = (dispatch) => {
    return {
        restore: (iMail) => dispatch(restorePassword(iMail)),
    };
};

const ForgotScreen = connect(forgotStateToProps, forgotDispatchToProps)(ForgotTab);



/***    OPT   ***/
OtpTab.propTypes = {
    confirm: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

const otpStateToProps = (state) => {
    return {
        isSuccess: state[ ModMap.Reg ].otpSuccess,
    };
};

const otpDispatchToProps = (dispatch) => {
    return {
        confirm: (iValue) => dispatch(confirmPhone(iValue)),
    };
};
const OtpScreen = connect( otpStateToProps, otpDispatchToProps)(OtpTab);



/***    TERMS   ***/
TermsTab.propTypes = {
    confirm: PropTypes.func.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

const termsStateToProps = (state) => {
    return {
        isSuccess: state[ ModMap.Reg ].termsSuccess,
    };
};

const termsDispatchToProps = (dispatch) => {
    return {
        confirm: () => dispatch(termsAgree()),
    };
};
const TermsScreen = connect( termsStateToProps, termsDispatchToProps)(TermsTab);


export { LoginScreen, SignupScreen, ForgotScreen, OtpScreen, TermsScreen };
