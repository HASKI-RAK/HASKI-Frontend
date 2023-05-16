import { User } from '@core'
import { RequestResponse } from './RequestResponse.d'

export const getUser = async (): Promise<User> => {
    return fetch(process.env.BACKEND + `/lms/user_from_cookie`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) =>
        response.json().then((data: unknown) => {
            if (response.ok) {
                return data as User
            } else {
                throw new Error((data as RequestResponse).message)
            }
        })
    )
}
