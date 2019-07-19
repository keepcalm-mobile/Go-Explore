import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import HotPicks from './HotPicks';

export default connect( state => (state[ ModMap.Reg ]), { login } )(HotPicks);
