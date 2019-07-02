import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { compose } from 'redux';
import AuthLoader from './AuthLoader';
import { ModMap } from '../../modules';

// const enhance = compose(
//     connect(),
// );

export default connect(state => ({ [ ModMap.Auth ] : state[ ModMap.Auth ] }))(AuthLoader);//enhance(AuthLoader);