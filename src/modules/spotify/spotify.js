// @flow
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchNewReleases } from '../../services/spotify';

// states
export const UNINITIALISED: string = 'UNINITIALISED';
export const LOADING: string = 'LOADING';
export const RECEIVED: string = 'RECEIVED';

// Initial state
type State = {
    +status: string,
    +albums: any,
    +error: string,
};

const initalState = {
    status: UNINITIALISED,
    albums: [],
    error: 'undefined'
};

// Action creators
type getNewReleasesAction = {
    type: "GET_NEW_RELEASES"
}

type getNewReleasesSuccessAction = {
    type: "GET_NEW_RELEASES_SUCCESS",
    albums: any
}

type getNewReleasesFailedAction = {
    type: "GET_NEW_RELEASES_FAILED",
    error: string
}

// Disjoint union
type Action = getNewReleasesAction | getNewReleasesSuccessAction | getNewReleasesFailedAction;

export const getNewReleases = (): getNewReleasesAction => {
    return {
        type: "GET_NEW_RELEASES"
    }
};

export const getNewReleasesSuccess = (albums: any): getNewReleasesSuccessAction => {
    return {
        type: "GET_NEW_RELEASES_SUCCESS",
        albums
    }
};

export const getNewReleasesFailed = (error: string ): getNewReleasesFailedAction => {
    return {
        type: "GET_NEW_RELEASES_FAILED",
        error
    }
};

// Reducer
export default(state: State = initalState, action: Action): State => {

    switch (action.type) {

        case "GET_NEW_RELEASES":
            return {
                ...state,
                status: LOADING
            };
        case "GET_NEW_RELEASES_SUCCESS":
            return {
                ...state,
                status: RECEIVED,
                albums: action.albums,
                error: 'undefined'
            };
        case "GET_NEW_RELEASES_FAILED":
            return {
                ...state,
                status: UNINITIALISED,
                error: action.error
            };

        default:
            return state;
    }
}

// Saga
export function* getNewReleasesSaga () {
    try {
        const { href } = window.location;
        const token = href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        const response = yield call(fetchNewReleases, token);
        yield put(getNewReleasesSuccess(response));
    } catch (error) {
        yield put(getNewReleasesFailed(error));
    }
}

// Watcher
export function* watchSpotifySaga (): any {
    yield takeLatest("GET_NEW_RELEASES", getNewReleasesSaga);
}

// selectors status
export const getSpotifyStatus = (state: any) => state.spotify.status;
export const getNewReleasesSelector = (state: any) => state.spotify.albums;
export const getSpotifyError = (state: any) => state.spotify.error;
