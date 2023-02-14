import { RequestResponse } from "./RequestResponse";

export const getLogout = async (): Promise<RequestResponse> => {
    return fetch(`http://fakedomain.com:5000/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then((response) => {
        return response.json();
    }) as Promise<RequestResponse>;
};