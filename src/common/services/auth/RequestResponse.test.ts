import { RequestResponse, getData } from './RequestResponse'

describe('RequestResponse', () => {

    const response = {
        json: () => Promise.resolve({ data: 'test' }),
        text: () => Promise.resolve('test'),
        ok: true,
        headers: { get: () => 'application/json' }
    }

    describe('when ok is true', () => {
        it('should have a status code between 200 and 299', () => {
            const response: RequestResponse = {
                status: 200,
                ok: true,
            }
            expect(response.status).toBeGreaterThanOrEqual(200)
            expect(response.status).toBeLessThanOrEqual(299)
        })

        it('should not have an error or message', () => {
            const response: RequestResponse = {
                status: 200,
                ok: true,
            }
            expect(response.error).toBeUndefined()
            expect(response.message).toBeUndefined()
        })

        it('should have a json property if the content type is application/json', async () => {
            const mockResponse = {
                ...response,
            }
            await expect(getData(mockResponse)).resolves.toEqual({ data: 'test' })
        })

        it('should have a text property if the content type is text/plain', async () => {

            const mockResponse = {
                ...response,
                headers: { get: () => 'text/plain' }
            }
            await expect(getData(mockResponse, 'text/plain')).resolves.toEqual('test')
        })

        it('should throw an error if the content type is not supported', async () => {
            const mockResponse = {
                ...response,
                headers: { get: () => 'text/html' }
            }
            await expect(() => getData(mockResponse, 'text/html')).rejects.toThrow(Error)
        })
    })

    describe('when ok is false', () => {
        it('should have an error and message', () => {
            const response: RequestResponse = {
                status: 400,
                ok: false,
                error: 'BadRequestException',
                message: 'Bad request',
            }
            expect(response.error).toBeDefined()
            expect(response.message).toBeDefined()
        })

        it('should throw an error if the response is not ok', async () => {
            const mockResponse = {
                ...response,
                ok: false,
                status: 500
            }
            await expect(() => getData(mockResponse)).rejects.toThrow(Error)
        })
    })
})