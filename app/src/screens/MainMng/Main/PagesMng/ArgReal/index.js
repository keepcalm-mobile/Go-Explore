import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import ArgReal from './ArgReal';

export default connect( state => (state[ ModMap.Reg ]), { login } )(ArgReal);
