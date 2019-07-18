import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../modules/map';
import {login} from '../../../modules/reg';
import Main from './Main';

const MainConnected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Main);

export default forwardRef((props, ref) =>
    <MainConnected {...props} ref={ref} />
);
