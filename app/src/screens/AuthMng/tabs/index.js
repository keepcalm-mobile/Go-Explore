import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import ForgotTab from './ForgotTab';
import OptTab from './OptTab';
import TermsTab from './TermsTab';
import {ModMap} from '../../../modules';
import {login} from '../../../modules/reg';


/***    LOGIN   ***/
LoginTab.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const loginStateToProps = (state) => {
    return {
        user: state[ ModMap.Reg ].user,
        hasErrored: state[ ModMap.Reg ].loginHasErrored,
        isLoading: state[ ModMap.Reg ].loginIsLoading,
    };
};

const loginDispatchToProps = (dispatch) => {
    return {
        login: (url) => dispatch(login(url)),
    };
};

const LoginScreen = connect(loginStateToProps, loginDispatchToProps)(LoginTab);



/***    SIGN UP   ***/
SignupTab.propTypes = {
};

const signUpStateToProps = (state) => {
    return {

    };
};

const signUpDispatchToProps = (dispatch) => {

};

const SignupScreen = connect(signUpStateToProps, signUpDispatchToProps)(SignupTab);



/***    FORGOT   ***/
const ForgotScreen = connect( state => (state) )(ForgotTab);



/***    OPT   ***/
const OptScreen = connect( state => (state) )(OptTab);



/***    TERMS   ***/
const TermsScreen = connect( state => (state) )(TermsTab);


// const LoginScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { login } )(LoginTab);//enhance(LoginTab);
// const SignupScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(SignupTab);//enhance(SignupTab);
// const ForgotScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(ForgotTab);//enhance(ForgotTab);
// const OptScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(OptTab);//enhance(OptTab);
// const TermsScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(TermsTab);//enhance(TermsTab);

export { LoginScreen, SignupScreen, ForgotScreen, OptScreen, TermsScreen, };
