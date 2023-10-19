export const getActor = (domain: string, lmsUserID: string) => {
  return {
    account: {
      homePage: new URL(window.location.href).origin,
      name: lmsUserID
    }
  }
}
