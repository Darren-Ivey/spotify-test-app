// @flow

import { catchError } from './utils';

export const fetchNewReleases = (token) => {
    const options = {
        'headers': {
            'Content-Type': "application/json",
        },
        'method': 'GET'
    };
    return fetch(`/v1/spotify/newReleases?token=${token}`, options)
        .then(res => catchError(res))
        .then(res => res.json());
};