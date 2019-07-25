import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {setCurCategory} from '../../../../../modules/categories';
import CategoriesMng from './CategoriesMng';

export default connect( state => (state[ ModMap.Categories ]), { setCurCategory } )(CategoriesMng);
