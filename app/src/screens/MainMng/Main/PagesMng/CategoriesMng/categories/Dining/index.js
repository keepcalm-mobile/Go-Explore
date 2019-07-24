import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Dining from './Dining';
import React, {forwardRef} from 'react';

const Connected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Dining);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
