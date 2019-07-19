import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Dining from './Dining';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Dining);
