import { RequestResponse } from "./RequestResponse";

export const postLoginCredentials = async (): Promise<RequestResponse> => {
    return fetch(`http://fakedomain.com:5000/login_credentials`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ username: "test", password: "test" }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return {
            status: response.status,
            message: response.statusText
        }
    }) as Promise<RequestResponse>;
}