import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../../../../../modules/map';
import {setCurCategory} from '../../../../../../../modules/categories';
import HotPicks from './HotPicks';
import PropTypes from 'prop-types';

HotPicks.propTypes = {
    setCurCategory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    curCategory: PropTypes.string.isRequired,
    data : PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        isLoading: state[ ModMap.Categories ].isLoading,
        curCategory: state[ ModMap.Categories ].curCategory,
        data: state[ ModMap.Categories ].categoriesData,
        // content : tempData,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(HotPicks);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);

