import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {setCurCategory} from '../../../../../../../modules/categories';
import Filter from './Filter';
// import React, {forwardRef} from 'react';
//
// const Connected = connect( state => (state[ ModMap.Categories ]), { setCurCategory }, null, { forwardRef: true } )(Filter);
//
// export default forwardRef((props, ref) =>
//     <Connected {...props} ref={ref} />
// );

export default Filter;