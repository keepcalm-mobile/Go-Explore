import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Shopping from './Shopping';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Shopping);
