import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Travel from './Travel';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Travel);
