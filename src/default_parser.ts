import QueryBuilder from './query_builder/query_builder'
import { TRequest } from './types/types'

let getQueryFromURL: (req: TRequest, res: any, next: any) => void = (
	req: TRequest,
	res: any,
	next: any
) => {
	try {
		const urlString = `${req.protocol}://${req.get('host')}${
			req.originalUrl
		}`
		const url = new URL(urlString)
		const query = QueryBuilder.buildQuery(url.searchParams)
		const limit = QueryBuilder.buildLimitQuery(url.searchParams)
		const sort = QueryBuilder.buildSortQuery(url.searchParams)
		req.parsedURL = url
		req.queryFromURL = {
			query: query,
			sort: sort,
			limit: limit,
		}
		next()
	} catch (error) {
		next()
	}
}

export default getQueryFromURL
