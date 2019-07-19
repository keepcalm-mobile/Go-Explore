import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import HealthBeauty from './HealthBeauty';

export default connect( state => (state[ ModMap.Reg ]), { login } )(HealthBeauty);
