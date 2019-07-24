import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import Notifications from './Notifications';
import React, {forwardRef} from 'react';

const Connected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Notifications);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
