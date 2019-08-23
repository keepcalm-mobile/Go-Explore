import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../modules/map';
import {setCurCategory} from '../../../modules/categories';
import Main from './Main';
import PropTypes from 'prop-types';
import {colors} from "../../../styles";

Main.propTypes = {
    setCurCategory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    curCategory: PropTypes.string.isRequired,
    panHandlers: PropTypes.object,
};

Main.defaultProps = {
    panHandlers : null,
};

const stateToProps = (state) => {
    return {
        isLoading: state[ ModMap.Categories ].isLoading,
        curCategory: state[ ModMap.Categories ].curCategory,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Main);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);


// const MainConnected = connect( state => (state[ ModMap.Categories ]), { setCurCategory }, null, { forwardRef: true } )(Main);
//
// export default forwardRef((props, ref) =>
//     <MainConnected {...props} ref={ref} />
// );
