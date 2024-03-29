import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import TableListK, { getSubscaleScore } from './TableListK'

//we have to mock react-i18next otherwise a warning will appear
//"You will need pass in an i18next instance by using initReactI18next" => mock is needed.

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          return str
        }
        // You can include here any property your component may use
      }
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

// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src
describe('Test TableList-K with all Methods', () => {
  test('Table Values are correct', () => {
    const { getAllByRole } = render(<TableListK data={mockListK} />)

    expect(getAllByRole('columnheader')[0]).toHaveTextContent('components.TableListK.factorsAndSubscales')
    expect(getAllByRole('columnheader')[1]).toHaveTextContent('components.TableListK.score')
    expect(getAllByRole('columnheader')[2]).toHaveTextContent('components.TableListK.factorsAndSubscales')
    expect(getAllByRole('columnheader')[3]).toHaveTextContent('components.TableListK.score')
    expect(getAllByRole('cell')[0]).toHaveTextContent('components.TableListK.cognitiveStrategies')
    expect(getAllByRole('cell')[2]).toHaveTextContent('components.TableListK.internalResourceManagementStrategies')
    expect(getAllByRole('cell')[4]).toHaveTextContent('components.TableListK.organize')
    expect(getAllByRole('cell')[6]).toHaveTextContent('components.TableListK.attention')
    expect(getAllByRole('cell')[8]).toHaveTextContent('components.TableListK.elaborate')
    expect(getAllByRole('cell')[10]).toHaveTextContent('components.TableListK.effort')
    expect(getAllByRole('cell')[12]).toHaveTextContent('components.TableListK.criticalReview')
    expect(getAllByRole('cell')[14]).toHaveTextContent('components.TableListK.time')
    expect(getAllByRole('cell')[16]).toHaveTextContent('components.TableListK.repeat')
    expect(getAllByRole('cell')[18]).toHaveTextContent('')
    expect(getAllByRole('cell')[20]).toHaveTextContent('components.TableListK.metacognitiveStrategies')
    expect(getAllByRole('cell')[22]).toHaveTextContent('components.TableListK.externalResourceManagementStrategies')
    expect(getAllByRole('cell')[24]).toHaveTextContent('components.TableListK.goalsAndPlans')
    expect(getAllByRole('cell')[26]).toHaveTextContent('components.TableListK.learningWithClassmates')
    expect(getAllByRole('cell')[28]).toHaveTextContent('components.TableListK.control')
    expect(getAllByRole('cell')[30]).toHaveTextContent('components.TableListK.literatureResearch')
    expect(getAllByRole('cell')[32]).toHaveTextContent('components.TableListK.regulate')
    expect(getAllByRole('cell')[34]).toHaveTextContent('components.TableListK.learningEnvironment')
  })

  test('Table Score-values are numbers', () => {
    const { getAllByRole: GetAllByRole } = render(<TableListK data={mockListK} />)

    const cell1 = GetAllByRole('cell')[1].textContent
    let cell1Int
    if (cell1 !== null) {
      cell1Int = parseInt(cell1)
    }

    const cell3 = GetAllByRole('cell')[3].textContent
    let cell3Int
    if (cell3 !== null) {
      cell3Int = parseInt(cell3)
    }

    const cell5 = GetAllByRole('cell')[5].textContent
    let cell5Int
    if (cell5 !== null) {
      cell5Int = parseInt(cell5)
    }

    const cell7 = GetAllByRole('cell')[7].textContent
    let cell7Int
    if (cell7 !== null) {
      cell7Int = parseInt(cell7)
    }

    const cell9 = GetAllByRole('cell')[9].textContent
    let cell9Int
    if (cell9 !== null) {
      cell9Int = parseInt(cell9)
    }

    const cell11 = GetAllByRole('cell')[11].textContent
    let cell11Int
    if (cell11 !== null) {
      cell11Int = parseInt(cell11)
    }

    const cell13 = GetAllByRole('cell')[13].textContent
    let cell13Int
    if (cell13 !== null) {
      cell13Int = parseInt(cell13)
    }

    const cell15 = GetAllByRole('cell')[15].textContent
    let cell15Int
    if (cell15 !== null) {
      cell15Int = parseInt(cell15)
    }

    const cell17 = GetAllByRole('cell')[17].textContent
    let cell17Int
    if (cell17 !== null) {
      cell17Int = parseInt(cell17)
    }

    const cell21 = GetAllByRole('cell')[21].textContent
    let cell21Int
    if (cell21 !== null) {
      cell21Int = parseInt(cell21)
    }

    const cell23 = GetAllByRole('cell')[23].textContent
    let cell23Int
    if (cell23 !== null) {
      cell23Int = parseInt(cell23)
    }

    const cell25 = GetAllByRole('cell')[25].textContent
    let cell25Int
    if (cell25 !== null) {
      cell25Int = parseInt(cell25)
    }

    const cell27 = GetAllByRole('cell')[27].textContent
    let cell27Int
    if (cell27 !== null) {
      cell27Int = parseInt(cell27)
    }

    const cell29 = GetAllByRole('cell')[29].textContent
    let cell29Int
    if (cell29 !== null) {
      cell29Int = parseInt(cell29)
    }

    const cell31 = GetAllByRole('cell')[31].textContent
    let cell31Int
    if (cell31 !== null) {
      cell31Int = parseInt(cell31)
    }

    const cell33 = GetAllByRole('cell')[33].textContent
    let cell33Int
    if (cell33 !== null) {
      cell33Int = parseInt(cell33)
    }

    const cell35 = GetAllByRole('cell')[35].textContent
    let cell35Int
    if (cell35 !== null) {
      cell35Int = parseInt(cell35)
    }

    expect(cell1Int).toBeGreaterThanOrEqual(0)
    expect(cell3Int).toBeGreaterThanOrEqual(0)
    expect(cell5Int).toBeGreaterThanOrEqual(0)
    expect(cell7Int).toBeGreaterThanOrEqual(0)
    expect(cell9Int).toBeGreaterThanOrEqual(0)
    expect(cell11Int).toBeGreaterThanOrEqual(0)
    expect(cell13Int).toBeGreaterThanOrEqual(0)
    expect(cell15Int).toBeGreaterThanOrEqual(0)
    expect(cell17Int).toBeGreaterThanOrEqual(0)
    expect(GetAllByRole('cell')[19]).toHaveTextContent('')
    expect(cell21Int).toBeGreaterThanOrEqual(0)
    expect(cell23Int).toBeGreaterThanOrEqual(0)
    expect(cell25Int).toBeGreaterThanOrEqual(0)
    expect(cell27Int).toBeGreaterThanOrEqual(0)
    expect(cell29Int).toBeGreaterThanOrEqual(0)
    expect(cell31Int).toBeGreaterThanOrEqual(0)
    expect(cell33Int).toBeGreaterThanOrEqual(0)
    expect(cell35Int).toBeGreaterThanOrEqual(0)
  })

  test('Average List-K are calculated correctly', () => {
    const ListKParameters = [3, 3, 5, 4, 5, 1] // Average=3.5
    const ListKAverage = getSubscaleScore(ListKParameters)

    expect(ListKAverage).toBe(3.5)
  })
})
