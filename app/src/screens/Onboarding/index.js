import {connect} from 'react-redux';
import ModMap from '../../modules/map';
import Onboarding from './Onboarding';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setMapTarget, setScrollOffset} from '../../modules';

Onboarding.propTypes = {
    data : PropTypes.object,
};

const stateToProps = (state) => {
    return {
        // data: state[ ModMap.Items ].items,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        // getItem: (iID, iType) => dispatch(getItem(iID, iType)),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    // const _itemId = ownProps.navigation.state.params.itemId;
    return ownProps;//Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
};

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(Onboarding);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
