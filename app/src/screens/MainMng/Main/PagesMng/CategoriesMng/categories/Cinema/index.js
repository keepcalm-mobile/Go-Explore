import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import Cinema from './Cinema';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../../../../../modules';

Cinema.propTypes = {
    // curCategory: PropTypes.string.isRequired,
    data : PropTypes.object,
};

const stateToProps = (state) => {
    return {
        // curCategory: state[ ModMap.Items ].curCategory,
        data: state[ ModMap.Items ].items,//state[ ModMap.Categories ].data,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        getItem: (iID, iType) => dispatch(getItem(iID, iType)),
        setScrollOffset: (iValue) => dispatch(setScrollOffset(iValue)),
        setMapTarget: (iValue) => dispatch(setMapTarget(iValue)),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const _itemId = ownProps.navigation.state.params.itemId;
    return Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
};

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(Cinema);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
