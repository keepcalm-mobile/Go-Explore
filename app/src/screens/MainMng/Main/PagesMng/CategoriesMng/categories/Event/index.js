import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import Event from './Event';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../../../../../../modules';

Event.propTypes = {
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
        setMapTarget: (iLatitude, iLongitude, iStatus) => dispatch(setMapTarget(iLatitude, iLongitude, iStatus)),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const _itemId = ownProps.navigation.state.params.itemId;
    return Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
};

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(Event);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
