import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {login} from '../../../modules/reg';
import Drawer from './Drawer';

const DrawerConnected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Drawer);

export default forwardRef((props, ref) =>
    <DrawerConnected {...props} ref={ref} />
);

