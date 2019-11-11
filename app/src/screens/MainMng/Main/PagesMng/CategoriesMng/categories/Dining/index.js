import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import Dining from './Dining';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../../../../../modules';

Dining.propTypes = {
    data : PropTypes.object,
};

const stateToProps = (state) => {
    return {
        data: state[ ModMap.Items ].items,
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

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(Dining);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
