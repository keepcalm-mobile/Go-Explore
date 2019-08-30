import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';
import {getUserData} from './modules/auth';
import {readFiltersData} from './modules/categories';

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(getUserData());
store.dispatch(readFiltersData());

//     .then(() => console.log(store.getState()));

export default store;
