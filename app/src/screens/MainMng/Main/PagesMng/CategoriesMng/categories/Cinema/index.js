import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Cinema from './Cinema';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Cinema);
