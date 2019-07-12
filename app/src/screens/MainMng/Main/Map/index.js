import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {login} from '../../../../modules/reg';
import Map from './Map';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Map);
