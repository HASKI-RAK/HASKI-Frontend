import { getConfig } from '@shared'
import {fetchData} from '../RequestResponse'
import { News } from '@core'

/**
 * 
 * @returns {@link News} object
 */
export const fetchNews =async():Promise<News>=>{
    return fetchData<News>(getConfig().BACKEND + '/news',{
        method:'GET',
        credentials:'include',
        headers:{
            'Content-Type': 'application/json'
        }
    })
}