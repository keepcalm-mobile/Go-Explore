import types from './types'
const initialState = {
    areaMin: 0,
    tMin: 0,
    tMax: 0,
};

export default function (state = initialState, action) {
    console.log("!!!!!!!!! old : " +JSON.stringify(state) + " new : "+ JSON.stringify(action.payload));
    if (action.type === types.SET_HEIGHT) {
        return {
            ...state,
            ...action.payload
        };
    }else{
        return state;
    }
}
