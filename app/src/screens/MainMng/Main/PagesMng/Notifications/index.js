import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import Notifications from './Notifications';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Notifications);
