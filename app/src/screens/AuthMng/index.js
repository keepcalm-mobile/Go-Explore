import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { compose } from 'redux';
import AuthMng from './AuthMng';
import { setCntHeight } from "../../modules/regAnim";
import ModMap from "../../modules/map";

// // const enhance = compose(
// //     connect(),
// // );
// //
// // export default enhance(AuthMng);
//
// const mapStateToProps = ({ navigator }) => test;
// //     ({
// //   navigator,
// //   isAuth: app.isAuthComplete,
// // });
//
// let test = function (navigator){
//     console.log("AuthMng connect : " + JSON.stringify(navigator));
// // console.log("test2 : " + JSON.stringify(navigator2));
//
//     return { navigator }
// };
//
// // const NavigatorContainer = connect(state => ({ count: state.count }))(NavigatorView);//connect(mapStateToProps)(NavigatorView);
// const AuthMngContainer = connect(mapStateToProps)(AuthMng);
//
// export default AuthMngContainer;

// export default connect(state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }))(AuthMng);
export default connect( state => ({ [ ModMap.Reg ] : state[ ModMap.Reg ], [ModMap.RegAnim] : state[ ModMap.RegAnim ] }), { setCntHeight } )(AuthMng);