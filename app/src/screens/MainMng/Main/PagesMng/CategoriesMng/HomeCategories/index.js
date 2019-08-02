import HomeCategories from './HomeCategories';
import PropTypes from 'prop-types';
import ModMap from '../../../../../../modules/map';
import {setCurCategory} from '../../../../../../modules/categories';
import {connect} from 'react-redux';
import React, {forwardRef} from 'react';

HomeCategories.propTypes = {
    setCurCategory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    curCategory: PropTypes.string.isRequired,
    data : PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        isLoading: state[ ModMap.Categories ].isLoading,
        curCategory: state[ ModMap.Categories ].curCategory,
        data: state[ ModMap.Categories ].data,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(HomeCategories);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
