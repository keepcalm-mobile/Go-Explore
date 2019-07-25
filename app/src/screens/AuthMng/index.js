import { connect } from 'react-redux';
import AuthMng from './AuthMng';
import { login } from '../../modules/reg';
import ModMap from '../../modules/map';

export default connect( state => (state[ ModMap.Reg ]), { login } )(AuthMng);
