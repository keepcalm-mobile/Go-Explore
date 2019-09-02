import HomeCategories from './HomeCategories';
import PropTypes from 'prop-types';
import ModMap from '../../../../../../modules/map';
import {setCurCategory, applyFilter} from '../../../../../../modules/categories';
import {setScrollOffset} from '../../../../../../modules/scrollOffset';
import {connect} from 'react-redux';
import React, {forwardRef} from 'react';

HomeCategories.propTypes = {
    setCurCategory: PropTypes.func.isRequired,
    applyFilter: PropTypes.func.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // curCategory: PropTypes.string.isRequired,
    data : PropTypes.object,
    filters: PropTypes.object,
    presets: PropTypes.object,
};

const stateToProps = (state) => {
    return {
        // isLoading: state[ ModMap.Categories ].isLoading,
        // curCategory: _curCat,
        data: state[ ModMap.Categories ].categories,
        filters: state[ ModMap.Categories ].filters,
        presets: state[ ModMap.Categories ].filtersSettings,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
        applyFilter: (iValue) => dispatch(applyFilter(iValue)),
        setScrollOffset: (iValue) => dispatch(setScrollOffset(iValue)),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const _curCat = ownProps.navigation.state.params.categoryId;

    let prop = {
        // isLoading:stateProps.isLoading,
        // curCategory:_curCat,
        data: stateProps.data[_curCat],
        filters: stateProps.filters[_curCat],
        presets: stateProps.presets[_curCat],
    };

    return Object.assign({}, ownProps, prop, dispatchProps);
};

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(HomeCategories);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
