import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {login} from '../../../../modules/reg';
import MenuBottom from './MenuBottom';

export default connect( state => (state[ ModMap.Reg ]), { login } )(MenuBottom);