import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import ModMap from '../../../modules/map';
import {setCurCategory} from '../../../modules/categories';
import Drawer from './Drawer';

const DrawerConnected = connect( state => (state[ ModMap.Categories ]), { setCurCategory }, null, { forwardRef: true } )(Drawer);

export default forwardRef((props, ref) =>
    <DrawerConnected {...props} ref={ref} />
);

