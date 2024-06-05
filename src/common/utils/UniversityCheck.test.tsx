import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { renderHook } from '@testing-library/react'
import { UniversityCheck } from './UniversityCheck'

const {checkUniversity}=UniversityCheck()

describe('Test the UniversityCheck utility', ()=>{
    test('Should return the university', async()=>{
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
        const currentUni=checkUniversity()
        expect(await currentUni).toBe('TH-AB')
    })
})