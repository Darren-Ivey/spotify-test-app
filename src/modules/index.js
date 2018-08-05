import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import spotify, { watchSpotifySaga } from './spotify/spotify';
import auth, { watchLoginSaga } from './auth/auth';

// root reducer
export const rootReducer = combineReducers({
    spotify,
    auth,
});

export function* rootSaga () {
    yield all([
        fork(watchSpotifySaga),
        fork(watchLoginSaga)
    ])
}