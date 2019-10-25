import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../modules/map';
import {setCurCategory} from '../../../modules/categories';
import Main from './Main';
import PropTypes from 'prop-types';

Main.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    panHandlers: PropTypes.object,
};

Main.defaultProps = {
    panHandlers : null,
};

const stateToProps = (state) => {
    console.log('<><><><><><><><> : STATE LOADING : ' + state.isLoading);
    return {
        isLoading: state.isLoading,
        //isLoading: false // TODO: Enable loading after testing // ne pomogaet blt
    };
};

const dispatchToProps = (dispatch) => {
    return {
        // setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Main);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);

