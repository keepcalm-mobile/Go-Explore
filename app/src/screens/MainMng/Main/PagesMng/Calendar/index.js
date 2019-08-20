import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {setScrollOffset} from '../../../../../modules/scrollOffset';
import Calendar from './Calendar';
import React, {forwardRef} from 'react';

const Connected = connect( state => (state[ ModMap.Reg ]), { setScrollOffset }, null, { forwardRef: true } )(Calendar);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
