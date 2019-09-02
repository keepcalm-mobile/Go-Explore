import t from './types';

function isLoading(state = false, action) {
    return (action.type === t.IS_LOADING) ? action.isLoading : state;
}

export default isLoading;
