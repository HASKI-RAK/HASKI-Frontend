import '@testing-library/jest-dom'
import GraphListK, { useData } from './GraphListK'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

// Mocking the resize observer to prevent errors in the tests
window.ResizeObserver = require('resize-observer-polyfill')

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str
    }
  }
}))

const mockListK = {
  characteristic_id: 1,
  id: 1,
  att: 1,
  cogn_str: 1,
  con: 1,
  crit_rev: 1,
  eff: 1,
  elab: 1,
  ext_res_mng_str: 1,
  goal_plan: 1,
  int_res_mng_str: 1,
  lit_res: 1,
  lrn_env: 1,
  lrn_w_cls: 1,
  metacogn_str: 1,
  org: 1,
  reg: 1,
  rep: 1,
  time: 1
}

describe('Test GraphListK with all Methods', () => {
  test('Required data is returned in correct format', () => {
    const data = useData(mockListK)

    expect(data.nodes.length).toBe(18)
    expect(data.links.length).toBe(17)

    expect(data.nodes[0].id).toMatch(
      'components.TableListK.Cognitive strategies'
    )
    expect(data.nodes[1].id).toMatch(
      'components.TableListK.Internal resource management strategies'
    )
    expect(data.nodes[2].id).toMatch(
      'components.TableListK.Metacognitive strategies'
    )
    expect(data.nodes[3].id).toMatch(
      'components.TableListK.External resource management strategies'
    )
    expect(data.nodes[4].id).toMatch('List K')
    expect(data.nodes[5].id).toContain('components.TableListK.Organize')
    expect(data.nodes[6].id).toContain('components.TableListK.Elaborate')
    expect(data.nodes[7].id).toContain('components.TableListK.Critical review')
    expect(data.nodes[8].id).toContain('components.TableListK.Repeat')
    expect(data.nodes[9].id).toContain('components.TableListK.Attention')
    expect(data.nodes[10].id).toContain('components.TableListK.Effort')
    expect(data.nodes[11].id).toContain('components.TableListK.Time')
    expect(data.nodes[12].id).toContain('components.TableListK.Goals & plans')
    expect(data.nodes[13].id).toContain('components.TableListK.Control')
    expect(data.nodes[14].id).toContain('components.TableListK.Regulate')
    expect(data.nodes[15].id).toContain(
      'components.TableListK.Learning with classmates'
    )
    expect(data.nodes[16].id).toContain(
      'components.TableListK.Literature research'
    )
    expect(data.nodes[17].id).toContain(
      'components.TableListK.Learning environment'
    )

    expect(data.links[0].source).toMatch('List K')
    expect(data.links[0].target).toMatch(
      'components.TableListK.Cognitive strategies'
    )
    expect(data.links[1].source).toMatch(
      'components.TableListK.Cognitive strategies'
    )

    expect(data.links[5].source).toMatch('List K')
    expect(data.links[5].target).toMatch(
      'components.TableListK.Internal resource management strategies'
    )
    expect(data.links[6].source).toMatch(
      'components.TableListK.Internal resource management strategies'
    )

    expect(data.links[9].source).toMatch('List K')
    expect(data.links[9].target).toMatch(
      'components.TableListK.Metacognitive strategies'
    )
    expect(data.links[10].source).toMatch(
      'components.TableListK.Metacognitive strategies'
    )

    expect(data.links[13].source).toMatch('List K')
    expect(data.links[13].target).toMatch(
      'components.TableListK.External resource management strategies'
    )
    expect(data.links[14].source).toMatch(
      'components.TableListK.External resource management strategies'
    )
  })

  test('GraphListK renders correctly', async () => {
    const graphListK = render(<GraphListK data={mockListK} />)

    const [
      averageCognitiveStrategies,
      averageInternalResourceManagementStrategies,
      averageMetacognitiveStrategies,
      averageExternalResourcesManagementStrategies
    ] = [1, 1, 1, 1]

    expect(
      graphListK.getAllByText(
        'components.ResultDescriptionListK.Score' +
          ': ' +
          (Math.round((averageCognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
      )[0]
    ).toBeInTheDocument()
    expect(
      graphListK.getAllByText(
        'components.ResultDescriptionListK.Score' +
          ': ' +
          (Math.round((averageInternalResourceManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
      )[0]
    ).toBeInTheDocument()
    expect(
      graphListK.getAllByText(
        'components.ResultDescriptionListK.Score' +
          ': ' +
          (Math.round((averageMetacognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
      )[0]
    ).toBeInTheDocument()
    expect(
      graphListK.getAllByText(
        'components.ResultDescriptionListK.Score' +
          ': ' +
          (Math.round((averageExternalResourcesManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2)
      )[0]
    ).toBeInTheDocument()

    expect(graphListK).toMatchSnapshot()
  })

  test('All bigger subscales are in graph', () => {
    const { container } = render(<GraphListK data={mockListK} />)

    const cognitiveStrategiesNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Cognitive strategies']`
    )
    const InternResNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Internal resource management strategies']`
    )
    const MetacognitiveNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Metacognitive strategies']`
    )
    const ExternalResNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.External resource management strategies']`
    )

    expect(cognitiveStrategiesNode).not.toBe(null)
    expect(InternResNode).not.toBe(null)
    expect(MetacognitiveNode).not.toBe(null)
    expect(ExternalResNode).not.toBe(null)
  })

  test('All smaller subscales are in graph', () => {
    const { container } = render(<GraphListK data={mockListK} />)

    const allSubscaleNodes = container.querySelectorAll(`circle[data-testid]`)
    expect(allSubscaleNodes.length).toBe(18)
  })

  test('All links are in graph', () => {
    const { container } = render(<GraphListK data={mockListK} />)

    const allLinks = container.querySelectorAll(`line[data-testid]`)
    expect(allLinks.length).toBe(17)
  })

  test('nodeSize is set', () => {
    const { container } = render(<GraphListK data={mockListK} />)

    const cognitiveStrategiesNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Cognitive strategies']`
    )
    const InternResNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Internal resource management strategies']`
    )
    const MetacognitiveNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.Metacognitive strategies']`
    )
    const ExternalResNode = container.querySelector(
      `circle[data-testid='node.components.TableListK.External resource management strategies']`
    )

    if (
      cognitiveStrategiesNode !== null &&
      InternResNode !== null &&
      MetacognitiveNode !== null &&
      ExternalResNode !== null
    ) {
      fireEvent.mouseOver(cognitiveStrategiesNode)
      expect(cognitiveStrategiesNode.getAttribute('r')).not.toBe(null)
      fireEvent.mouseOver(InternResNode)
      expect(InternResNode.getAttribute('r')).not.toBe(null)
      fireEvent.mouseOver(MetacognitiveNode)
      expect(MetacognitiveNode.getAttribute('r')).not.toBe(null)
      fireEvent.mouseOver(ExternalResNode)
      expect(ExternalResNode.getAttribute('r')).not.toBe(null)
    }
  })
})
