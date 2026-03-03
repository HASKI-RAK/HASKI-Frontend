type GamificationSettings = {
  id?: number
  student_id?: number
  presentation?: string
  social?: string
  information?: string
  message?: string
}

type GamificationSettingsReturn = (studentId: number) => Promise<GamificationSettings>

type GamificationSettingsPostReturn = (
  studentId: number,
  gamificationSettings: GamificationSettings
) => Promise<GamificationSettings>

export default GamificationSettings
export type { GamificationSettingsPostReturn, GamificationSettingsReturn }
