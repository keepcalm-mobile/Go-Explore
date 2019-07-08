import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';
import {getAuthKey} from './modules/auth';

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(getAuthKey());
//     .then(() => console.log(store.getState()));

export default store;