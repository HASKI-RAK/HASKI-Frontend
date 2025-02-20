import { Actor } from '@xapi/xapi'

//TODO: DOKU
export type ActorProps = {
  userID: string
}

/**
 * getActor function.
 *TODO
 * @param lmsUserID - The LMS user ID of the current user.
 *
 * @remarks
 * getActor presents a function that can be used to get the actor part of an xAPI statement.
 *
 * @returns - The actor part of an xAPI statement.
 *
 * @category Services
 */
export const getActor = ({ userID }: ActorProps): Actor => {
  return {
    account: {
      homePage: window.location.origin,
      name: userID
    }
  }
}
