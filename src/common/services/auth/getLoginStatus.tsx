import { RequestResponse } from "./RequestResponse";

export const getLoginStatus = async (): Promise<RequestResponse> => {
    return fetch(`http://fakedomain.com:5000/loginstatus`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/json'
        }
    }).then((response) => {
        return response.json();
    }) as Promise<RequestResponse>;
}