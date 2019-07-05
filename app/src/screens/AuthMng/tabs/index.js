import { connect } from 'react-redux';
// import { compose } from 'recompose';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import ForgotTab from './ForgotTab';
import OptTab from './OptTab';
import TermsTab from './TermsTab';
import {ModMap} from "../../../modules";
import {setCntHeight} from "../../../modules/regAnim";

// const enhance = compose(
//     connect(state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }, { setCntHeight })),
// );

const LoginScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(LoginTab);//enhance(LoginTab);
const SignupScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(SignupTab);//enhance(SignupTab);
const ForgotScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(ForgotTab);//enhance(ForgotTab);
const OptScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(OptTab);//enhance(OptTab);
const TermsScreen = connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(TermsTab);//enhance(TermsTab);

export {
    LoginScreen, SignupScreen, ForgotScreen, OptScreen, TermsScreen
};
