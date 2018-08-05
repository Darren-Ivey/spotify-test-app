// @flow
import { takeLatest, put } from 'redux-saga/effects';
import history from '../../history';

// states
export const AUTHORISED: string = 'AUTHORISED';
export const UNAUTHORISED: string = 'UNAUTHORISED';

// Initial state
type State = {
    +status: string
};

const initalState = {
    status: UNAUTHORISED
};

type loginAction = {
    type: "LOGIN"
}

type loginSuccessAction = {
    type: "LOGOUT"
}

// Disjoint union
type Action = loginAction | loginSuccessAction | loginFailedAction;

export const login = (): loginAction => {
    return {
        type: "LOGIN"
    }
};

export const logout = (): loginSuccessAction => {
    return {
        type: "LOGOUT"
    }
};

// Reducer
export default(state: State = initalState, action: Action): State => {

    switch (action.type) {

        case "LOGIN":
            return {
                ...state,
                authorisationStatus: AUTHORISED
            };
        case "LOGOUT":
            return {
                ...state,
                authorisationStatus: UNAUTHORISED
            };

        default:
            return state;
    }
}

// Saga
export function* loginSaga () {
    yield put(history.push('/login'));
}

// Saga
export function* logoutSaga () {
    yield put(history.push('/'));
}

// Watcher
export function* watchLoginSaga (): any {
    yield takeLatest("LOGIN", loginSaga);
    yield  takeLatest('LOGOUT', logoutSaga)
}

// selectors status
export const getAuthorisationStatus = (state: any) => state.spotify.status;
