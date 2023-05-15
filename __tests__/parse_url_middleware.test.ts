import GetQueryFromURLMiddleware from '../src/main'
import compareObjects from 'compare_objects_imjano'
import { TRequest } from '../src/types/types'

/**
 * mock the express required request, response and next params
 */
const from = '2023-05-10'
const to = '2023-05-11'
const param = 'name'
const equalTo = 'imjano'

const buildRequest = (path: string): TRequest => {
	return {
		protocol: 'http',
		get: (param: 'host') => '127.0.0.1',
		originalUrl: path,
	}
}
const response = {}
const next = () => null

const getQueryFromURL = GetQueryFromURLMiddleware.configure({
	defaultFields: {
		id: '_id',
		timestampCreatedAt: 'createdAt',
		timestampUpdatedAt: 'updatedAt',
	},
})

describe('we have a incoming request, so we can handle it to get query parameters', () => {
	it('should parse the url incoming into a query object to be used for mongoose queries', () => {
		const request = buildRequest(`/example_query?from=${from}`)
		getQueryFromURL(request, {}, next)
		expect(
			compareObjects(request.queryFromURL?.query.createdAt.$gte, from)
		).toBe(true)
	})
})

describe('we have a incoming request, so we can handle it to get query parameters', () => {
	it('should parse the url incoming into a query object to be used for mongoose queries', () => {
		const request = buildRequest(`/example_query?to=${to}`)
		getQueryFromURL(request, {}, next)
		expect(
			compareObjects(request.queryFromURL?.query.createdAt.$lte, to)
		).toBe(true)
	})
})

describe('we have a incoming request, so we can handle it to get query parameters', () => {
	it('should parse the url incoming into a query object to be used for mongoose queries', () => {
		const request = buildRequest(`/example_query?to=${to}&from=${from}`)
		getQueryFromURL(request, {}, next)
		expect(
			compareObjects(request.queryFromURL?.query.createdAt.$lte, to) &&
				compareObjects(request.queryFromURL?.query.createdAt.$gte, from)
		).toBe(true)
	})
})
