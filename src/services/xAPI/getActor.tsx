export const getActor = (domain: string, lmsUserID: string) => {
  return {
    account: {
      homePage: domain,
      name: lmsUserID
    }
  }
}
