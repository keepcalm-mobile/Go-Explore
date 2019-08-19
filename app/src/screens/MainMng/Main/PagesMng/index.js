import {connect} from 'react-redux';
import ModMap from '../../../../modules/map';
import {setCurCategory} from '../../../../modules/categories';
import PagesMng from './PagesMng';
import React from 'react';
import PropTypes from 'prop-types';

// PagesMng.propTypes = {
//     setCurCategory: PropTypes.func.isRequired,
// };
//
// const stateToProps = (state) => {
//     return {};
// };
//
// const dispatchToProps = (dispatch) => {
//     return {};
// };
//
// const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(PagesMng);
//
// export default forwardRef((props, ref) =>
//     <Connected {...props} ref={ref} />
// );

// export default connect( state => (state[ ModMap.Categories ]), { setCurCategory } )(PagesMng);

export default PagesMng;
