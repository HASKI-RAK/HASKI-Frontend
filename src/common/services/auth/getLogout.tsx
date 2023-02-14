type LogoutResponse = {
    status: number;
    message: string;
};

export const getLogout = async (): Promise<LogoutResponse> => {
    return fetch(`http://fakedomain.com:5000/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then((response) => {
        return response.json();
    }) as Promise<LogoutResponse>;
};