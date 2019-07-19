import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Attraction from './Attraction';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Attraction);
