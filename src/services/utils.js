export const catchError = (response) => {
    if (!response.ok) {
        let error: { error: string };
        switch (response.status) {
            case 401:
                throw error = "UNAUTHORIZED";
            case 403:
                throw error = "FORBIDDEN";
            case 404:
                throw error = "NOT_FOUND";
            default:
                throw error = "UNKNOWN_API_ERROR";
        }
    }
    return response;
};

export const getToken = () => {
    return localStorage.getItem('access_token');
};
