import { connect } from 'react-redux';
import { compose } from 'recompose';

import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import ForgotTab from './ForgotTab';
import OptTab from './OptTab';
import TermsTab from './TermsTab';


const enhance = compose(
    connect(),
);

const LoginScreen = enhance(LoginTab);
const SignupScreen = connect(state => ({ count: state.count }))(SignupTab);//enhance(SignupTab);
const ForgotScreen = connect(state => ({ count: state.count2 }))(ForgotTab);//enhance(ForgotTab);
const OptScreen = enhance(OptTab);
const TermsScreen = enhance(TermsTab);

export {
    LoginScreen, SignupScreen, ForgotScreen, OptScreen, TermsScreen
};
