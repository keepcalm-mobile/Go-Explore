import types from './types';
const initialState = {
    areaMin: 0,
    tMin: 0,
    tMax: 0,
};

export default function (state = initialState, action) {
    console.log('!!!!!!!!! old : ' + JSON.stringify(state) + ' new : ' + JSON.stringify(action.payload));
    if (action.type === types.SET_HEIGHT) {
        if ( (action.payload.areaMin && action.payload.areaMin !== state.areaMin) ||
            (action.payload.tMin && action.payload.tMin !== state.tMin) ||
            (action.payload.tMax && action.payload.tMax !== state.tMax)) {
            return {
                ...state,
                ...action.payload,
            };
        } else {
            return state;
        }
    } else {
        return state;
    }
}
