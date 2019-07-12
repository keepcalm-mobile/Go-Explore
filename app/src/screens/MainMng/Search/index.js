import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {login} from '../../../modules/reg';
import Search from './Search';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Search);
