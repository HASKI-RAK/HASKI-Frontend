import { RequestResponse } from "./RequestResponse";

export const getLogout = async (): Promise<RequestResponse> => {
    return fetch(process.env.BACKEND + `/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then((response) => {
        return {
            status: response.status,
            message: response.statusText,
        }
    }) as Promise<RequestResponse>;
};