import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../../../../../modules/map';
import {login} from '../../../../../../../modules/reg';
import Shopping from './Shopping';

const Connected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Shopping);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
