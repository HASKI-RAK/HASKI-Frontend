import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import MainFrame from './MainFrame'
import {MemoryRouter} from 'react-router-dom'
import * as router from "react-router";

const navigate = jest.fn()

describe('MainFrame', () => {

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the MainFrame', () => {

    const result = render(
      <MemoryRouter>
        <MainFrame />
      </MemoryRouter>
    )
    expect(result).toBeTruthy()
  })

})
