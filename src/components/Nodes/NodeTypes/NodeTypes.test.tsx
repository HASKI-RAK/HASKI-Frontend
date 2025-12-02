import {
  Article,
  Assignment,
  AssignmentInd,
  AssignmentLate,
  Description,
  Feedback,
  Flag,
  Forum,
  QuestionMark,
  SettingsApplications,
  ShortText,
  TipsAndUpdates,
  Videocam
} from '@common/icons'
import { getNodeIcon } from './NodeTypes'

describe('[HASKI-REQ-0085] getNodeIcon', () => {
  const fontSize = 20

  it('should return the correct icon component for each known key', () => {
    expect(getNodeIcon('AB', fontSize).type).toBe(SettingsApplications)
    expect(getNodeIcon('AN', fontSize).type).toBe(Videocam)
    expect(getNodeIcon('BE', fontSize).type).toBe(Assignment)
    expect(getNodeIcon('EK', fontSize).type).toBe(TipsAndUpdates)
    expect(getNodeIcon('EF', fontSize).type).toBe(QuestionMark)
    expect(getNodeIcon('FO', fontSize).type).toBe(Forum)
    expect(getNodeIcon('KÜ', fontSize).type).toBe(ShortText)
    expect(getNodeIcon('LZ', fontSize).type).toBe(Flag)
    expect(getNodeIcon('RQ', fontSize).type).toBe(Feedback)
    expect(getNodeIcon('SE', fontSize).type).toBe(AssignmentInd)
    expect(getNodeIcon('ÜB', fontSize).type).toBe(AssignmentLate)
    expect(getNodeIcon('ZF', fontSize).type).toBe(Description)
    expect(getNodeIcon('ZL', fontSize).type).toBe(Article)
  })

  it('should return the fallback icon (QuestionMark) for an unknown key', () => {
    expect(getNodeIcon('UNKNOWN', fontSize).type).toBe(QuestionMark)
  })
})
