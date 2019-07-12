import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {login} from '../../../modules/reg';
import Drawer from './Drawer';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Drawer);
