import { getConfig } from '@shared'
import {fetchData} from '../RequestResponse'
import { NewsList } from '@core'

/**
 * 
 * @returns {@link News} object
 */
export const fetchNews =async():Promise<NewsList>=>{
    return fetchData<NewsList>(getConfig().BACKEND + '/news',{
        method:'GET',
        credentials:'include',
        headers:{
            'Content-Type': 'application/json'
        }

       /*
       Backend Response: 
        {"message": [
            {"message": "",
        "until":},
        {"message": [
            {"message": "",
        "until":},
        ...
        ]}
        */
    })
}