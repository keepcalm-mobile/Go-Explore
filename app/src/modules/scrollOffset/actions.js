import t from './types';

function scrollOffset(iValue) {
    return {
        type: t.SCROLL_OFFSET,
        scrollOffset: iValue,
    };
}

export function setScrollOffset(iValue) {
    return (dispatch) => {
        dispatch(scrollOffset(iValue));
    };
}