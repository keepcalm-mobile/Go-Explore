import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {login} from '../../../../modules/reg';
import PagesMng from './PagesMng';
export default connect( state => (state[ ModMap.Reg ]), { login } )(PagesMng);
