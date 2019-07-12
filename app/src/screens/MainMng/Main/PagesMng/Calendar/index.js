import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import Calendar from './Calendar';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Calendar);
