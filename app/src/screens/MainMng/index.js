import { connect } from 'react-redux';
import MainMng from './MainMng';
import ModMap from '../../modules/map';
import {login} from '../../modules/reg';

export default connect( state => (state[ ModMap.Reg ]), { login } )(MainMng);
