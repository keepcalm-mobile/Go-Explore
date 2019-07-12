import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import CategoriesMng from './CategoriesMng';

export default connect( state => (state[ ModMap.Reg ]), { login } )(CategoriesMng);
