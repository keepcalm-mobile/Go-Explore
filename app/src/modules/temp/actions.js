import types from "./types";
import modMap from "../map";

function requestPosts(subreddit) {
    console.log("requestPosts !!!");
    return {
        type: types.REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    console.log("receivePosts !!!");
    return {
        type: types.RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function invalidateSubreddit(subreddit) {
    console.log("invalidateKey !!!");
    return {
        type: types.INVALIDATE_SUBREDDIT,
        subreddit
    }
}


export function fetchPosts(subreddit) {
    console.log("readUserData !!!");
    return function(dispatch) {
        dispatch(requestPosts(subreddit));

        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                dispatch(receivePosts(subreddit, json))
            )
    }
}

function shouldFetchPosts(state, subreddit) {
    console.log("shouldFetchPosts ? : " + JSON.stringify(state));
    console.log("MOD : " + modMap.Auth);
    const posts = state[modMap.Auth].postsBySubreddit[subreddit];
    if (!posts) {
        console.log("shouldFetchPosts = true");
        return true
    } else if (posts.isFetching) {
        console.log("shouldFetchPosts = false");
        return false
    } else {
        console.log("shouldFetchPosts = ERROR");
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    console.log("FETCH : " + JSON.stringify(subreddit));
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        } else {
            return Promise.resolve()
        }
    }
}