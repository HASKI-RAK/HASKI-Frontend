type GamificationSettings = {
  student_id: number
  presentation: string
  social: string
  information: string
}

type EmptyReturn = Record<string, never>

type GamificationSettingsReturn = (studentId: number) => Promise<GamificationSettings | EmptyReturn>

type GamificationSettingsPostResponse = {
  message: string
}

type GamificationSettingsPostReturn = (studentId: number, gamificationSettings: GamificationSettings) => Promise<GamificationSettingsPostResponse>

export default GamificationSettings
export type { GamificationSettingsPostResponse, GamificationSettingsPostReturn, GamificationSettingsReturn }
