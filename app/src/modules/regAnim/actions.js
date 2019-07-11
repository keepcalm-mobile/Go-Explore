import types from "./types";

export const setCntHeight = value => ({
    type: types.SET_HEIGHT,
    payload : value,
});


// export function setCntHeight(value) {
//     console.log("setCntHeight!!!!" + value);
//     return (dispatch, getState) => {
//         return dispatch({
//             type: t.CHANGE_HEIGHT,
//             payload: {value}
//         });
//     }
// }

// export function setCntHeight(value) {
//     console.log("blabla !!!" + JSON.stringify(value));
//     return {
//         type: t.CHANGE_HEIGHT,
//         payload : value
//     }
// }


// export const setCntHeight = (value) => (dispatch, getState) => {
//     console.log("blabla !!!" + JSON.stringify(value));
//     dispatch({
//         type: t.CHANGE_HEIGHT,
//         payload: value,
//     });
// };

// export setCntHeight;