const axios = require('axios');

const getNewReleases = (token) => {
    const url = 'https://api.spotify.com/v1/browse/new-releases';
    const config = {
        headers: {
            'Authorization': `Bearer ${ token }`
        },
        method: 'GET',
        url
    };
    return axios(config)
        .then((response) => response.data)
        .catch((error) => { console.log(error) })
};

module.exports = getNewReleases;