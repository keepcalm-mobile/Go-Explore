import { connect } from 'react-redux';
import React from 'react';
import MainMng from './MainMng';
import ModMap from '../../modules/map';
import PropTypes from 'prop-types';

MainMng.propTypes = {
    scrollOffset: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        scrollOffset: state[ ModMap.Scroll ].scrollOffset,
    };
};

const dispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(stateToProps, dispatchToProps)(MainMng);
// export default connect( state => (state[ ModMap.Scroll ]), { } )(MainMng);