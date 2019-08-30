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
    isLoading: PropTypes.bool.isRequired,
    curCategory: PropTypes.string.isRequired,
    data : PropTypes.object,
    filters: PropTypes.object,
    presets: PropTypes.object,
};

const stateToProps = (state) => {
    let _curCat = state[ ModMap.Categories ].curCategory;
    return {
        isLoading: state[ ModMap.Categories ].isLoading,
        curCategory: _curCat,
        data: state[ ModMap.Categories ].categories[_curCat],
        filters: state[ ModMap.Categories ].filters[_curCat],
        presets: state[ ModMap.Categories ].filtersSettings[_curCat],
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
        applyFilter: (iValue) => dispatch(applyFilter(iValue)),
        setScrollOffset: (iValue) => dispatch(setScrollOffset(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(HomeCategories);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
