export const getActor = (lmsUserID: string) => {
  return {
    account: {
      homePage: new URL(window.location.href).origin,
      name: lmsUserID
    }
  }
}
