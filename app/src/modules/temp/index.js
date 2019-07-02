import reducer from './reducers';

export { fetchPosts, fetchPostsIfNeeded, invalidateSubreddit } from './actions';//default as authActions
export { default as regTypes } from './types';

export default reducer;