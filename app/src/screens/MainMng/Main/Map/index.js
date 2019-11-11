import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../../modules/map';
import {setMapTarget} from '../../../../modules';
import Map from './Map';
import PropTypes from 'prop-types';

Map.propTypes = {
    mapTarget: PropTypes.object,
};

// Map.defaultProps = {
//     panHandlers : null,
// };

const stateToProps = (state) => {
    return {
        mapTarget: state[ModMap.Items].mapTarget,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setMapTarget: (iLatitude, iLongitude, iStatus) => dispatch(setMapTarget(iLatitude, iLongitude, iStatus)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(Map);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
//
//
// import {connect} from 'react-redux';
// import ModMap from '../../../../modules/map';
// import {login} from '../../../../modules/reg';
// import Map from './Map';
//
// export default Map;//connect( state => (state[ ModMap.Reg ]), { login } )(Map);
