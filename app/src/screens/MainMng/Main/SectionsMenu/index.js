import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {login} from '../../../../modules/reg';
import SectionsMenu from './SectionsMenu';

export default SectionsMenu;//connect( state => (state[ ModMap.Reg ]), { login } )(SectionsMenu);
