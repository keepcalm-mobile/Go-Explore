import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {setCurCategory} from '../../../../modules/categories';
import PagesMng from './PagesMng';
export default connect( state => (state[ ModMap.Categories ]), { setCurCategory } )(PagesMng);
