import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import Bookmarks from './Bookmarks';

export default connect( state => (state[ ModMap.Reg ]), { login } )(Bookmarks);
