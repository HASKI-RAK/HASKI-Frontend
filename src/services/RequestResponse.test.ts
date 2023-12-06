import { RequestResponse, fetchData } from './RequestResponse'
import '@testing-library/jest-dom'
import { getConfig } from '@shared'

describe('RequestResponse', () => {
  const response = {
    text: () => Promise.reject(new Error('error')),
    json: () => Promise.reject(new Error('error')),
    ok: true
  }

  describe('when ok is true', () => {
    it('should have a status code between 200 and 299', () => {
      const response: RequestResponse = {
        status: 200,
        ok: true
      }
      expect(response.status).toBeGreaterThanOrEqual(200)
      expect(response.status).toBeLessThanOrEqual(299)
    })

    it('should not have an error or message', () => {
      const response: RequestResponse = {
        status: 200,
        ok: true
      }
      expect(response.error).toBeUndefined()
      expect(response.message).toBeUndefined()
    })

    it('should have a json property if the content type is application/json', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve('test'),
          ok: true,
          status: 200,
          message: 'OK',
          headers: {
            get: () => 'application/json'
          }
        })
      ) as jest.Mock

      const result = fetchData<Response>(getConfig().BACKEND + `/user/1/1/contactform`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(result).resolves.toBe('test')
    })

    it('should throw an error if the response is not undefined', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject(new Error('error')),
          ok: true,
          status: 400,
          message: 'OK',
          headers: {
            get: () => 'application/json'
          },
          text: () => Promise.reject(new Error('error')),
          data: () => Promise.resolve('?')
        })
      ) as jest.Mock

      const result = fetchData<Response>(getConfig().BACKEND + `/user/1/1/contactform`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(result).rejects.toThrow(Error)
    })

    it('should return undefined if the json and the text thow an error', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject(new Error('error')),
          ok: true,
          status: 400,
          message: 'OK',
          headers: {
            get: () => 'application/json'
          },
          text: () => Promise.reject(new Error('error'))
        })
      ) as jest.Mock

      const result = fetchData<Response>(getConfig().BACKEND + `/user/1/1/contactform`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(result).resolves.toBe(undefined)
    })
  })

  describe('when ok is false', () => {
    it('should have an error and message', () => {
      const response: RequestResponse = {
        status: 400,
        ok: false,
        error: 'BadRequestException',
        message: 'Bad request'
      }
      expect(response.error).toBeDefined()
      expect(response.message).toBeDefined()
    })

    it('should throw an error if the response is not ok', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve('test'),
          ok: false,
          status: 400,
          message: 'OK',
          headers: {
            get: () => 'application/json'
          }
        })
      ) as jest.Mock

      const result = fetchData<Response>(getConfig().BACKEND + `/user/1/1/contactform`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(result).rejects.toThrow(Error)
    })
  })
})
