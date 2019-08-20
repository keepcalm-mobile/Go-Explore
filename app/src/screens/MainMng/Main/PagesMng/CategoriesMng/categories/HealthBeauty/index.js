import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import {setScrollOffset} from '../../../../../../../modules/scrollOffset';
import HealthBeauty from './HealthBeauty';
import React, {forwardRef} from 'react';

const Connected = connect( state => (state[ ModMap.Reg ]), { setScrollOffset }, null, { forwardRef: true } )(HealthBeauty);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
