import {connect} from 'react-redux';
import ModMap from '../../../../../modules/map';
import {login} from '../../../../../modules/reg';
import Bookmarks from './Bookmarks';
import React, {forwardRef} from 'react';

const Connected = connect( state => (state[ ModMap.Reg ]), { login }, null, { forwardRef: true } )(Bookmarks);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
