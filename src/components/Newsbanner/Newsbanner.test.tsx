import '@testing-library/jest-dom'
import { fireEvent, render, act, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import Newsbanner from './Newsbanner'
import { MemoryRouter } from 'react-router-dom'
import { UniversityCheck } from '@common/utils'

describe("Newsbanner tests", ()=>{

    beforeEach(() => {
        window.localStorage.clear();
    })
    
    test("Close the open Newsbanner", async ()=>{
        mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
              id: 1,
              lms_user_id: 1,
              name: 'Thaddäus Tentakel',
              role: 'Tester',
              role_id: 1,
              settings: {
                id: 1,
                user_id: 1,
                pswd: '1234',
                theme: 'test'
              },
              university: 'TH-AB'
            })
          )
      
          const { result } = renderHook(() => UniversityCheck(), {
            wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
          })

          expect(await result.current.checkUniversity()).toBe('TH-AB')

          mockServices.fetchNews = jest.fn().mockImplementation(()=>
            Promise.resolve({
                news:[
                    {
                        date: 'Thu, 13 Jul 2023 16:00:00 GMT',
                        expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
                        id: 1,
                        language_id: 'en',
                        news_content: 'We are currently testing the site',
                        university: 'TH-AB'
                    }
                ]
            }))

        const {container, getByTestId, rerender} = render(
        <MemoryRouter>
            <Newsbanner/>
        </MemoryRouter>  )

        await new Promise(process.nextTick)

        await new Promise(process.nextTick)
        await new Promise(process.nextTick)


        rerender(
            <MemoryRouter>
            <Newsbanner/>
        </MemoryRouter> 
        )

        await new Promise(process.nextTick)


        rerender(
            <MemoryRouter>
            <Newsbanner/>
        </MemoryRouter> 
        )

        await act(async() => {
            const closeButton = getByTestId('IconButton')
            //fireEvent.click(closeButton)
            expect(closeButton).toBeInTheDocument()
          })
       
        
    })
    test("Newsbanner doesnt open because no news", ()=>{
        mockServices.fetchNews = jest.fn().mockImplementationOnce(()=>
        Promise.resolve({
            news:[
                {}
            ]
        }))
        const form = render( <Newsbanner/> )
        
    })
})