import reducer from './reducers';

export { readKey, getAuthKey, invalidateKey } from './actions';//default as authActions
export { default as authTypes } from './types';

export default reducer;
