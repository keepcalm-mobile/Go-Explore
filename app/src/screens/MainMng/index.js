import { connect } from 'react-redux';
import React from 'react';
import MainMng from './MainMng';
import ModMap from '../../modules/map';
import PropTypes from 'prop-types';
import {login} from '../../modules/reg';

MainMng.propTypes = {
    scrollOffset: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        scrollOffset: state[ ModMap.Scroll ].scrollOffset,
        isLoading: state.isLoading,
        auth: state[ ModMap.Auth ],
    };
};

const dispatchToProps = (dispatch) => {
    return {
        login: (iValue) => dispatch(login(iValue)),
    };
};

export default connect(stateToProps, dispatchToProps)(MainMng);
