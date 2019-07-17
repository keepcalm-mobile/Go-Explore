import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {login} from '../../../modules/reg';
import Main from './Main';
export default connect( state => (state[ ModMap.Reg ]), { login } )(Main);
