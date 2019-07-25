import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {login} from '../../../../modules/reg';
import MenuPages from './MenuPages';

export default MenuPages;//connect( state => (state[ ModMap.Reg ]), { login } )(MenuPages);
