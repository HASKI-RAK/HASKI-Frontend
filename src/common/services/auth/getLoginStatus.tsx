
export type LoginStatusResponse = {
    status: number;
    message: string;
};

export const getLoginStatus = async (): Promise<LoginStatusResponse> => {
    return fetch(`http://fakedomain.com:5000/loginstatus`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/json'
        }
    }).then((response) => {
        return response.json();
    }) as Promise<LoginStatusResponse>;
}