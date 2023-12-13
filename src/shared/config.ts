export type Config = {
  [key: string]: string | undefined
}

type GetConfig = () => Config

// eslint-disable-next-line immutable/no-let
let appConfig = {}
export const getConfig: GetConfig = () => appConfig
export const setConfig = (config: Config) => {
  appConfig = config
}
