import QueryBuilder from './query_builder/query_builder'
import { IGetQueryFromURLConfig, TRequest } from './types/types'

const GetQueryFromURL = {
	/**
	 * @author imjano
	 * @param req express.Request. Containing information about the incoming HTTP request.
	 * @param res express.Response. The response object, used to send a response to the client
	 * @param next express.NextFunction. The next function to be called in the middleware chain.
	 * @returns void
	 * @description The function extracts the protocol and 'host' attribute from the req parameter to construct the URL.
	 * It then creates a query object based on the URL, which will be used for querying a database using mongoose.
	 * The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.
	 */
	parse(req: TRequest, res: any, next: any) {
		try {
			const urlString = `${req.protocol}://${req.get('host')}${
				req.originalUrl
			}`
			const url = new URL(urlString)
			req.parsedUrl = url
			const query = QueryBuilder.buildQuery(url.searchParams)
			const limit = QueryBuilder.buildLimitQuery(url.searchParams)
			const sort = QueryBuilder.buildSortQuery(url.searchParams)
			req.urlSearchParams = {
				query: query,
				sort: sort,
				limit: limit,
			}
			next()
		} catch (error) {
			next()
		}
	},

	buildParser(conf: IGetQueryFromURLConfig) {
		const buildQueryFunction =
			conf.parserFunctions?.buildQuery ?? QueryBuilder.buildQuery
		const buildLimitQueryFunction =
			conf.parserFunctions?.buildLimitQuery ??
			QueryBuilder.buildLimitQuery
		const buildSortQueryFunction =
			conf.parserFunctions?.buildSortQuery ?? QueryBuilder.buildSortQuery
		return function (req: TRequest, res: any, next: any) {
			try {
				const urlString = `${req.protocol}://${req.get('host')}${
					req.originalUrl
				}`
				const url = new URL(urlString)
				req.parsedUrl = url
				const query = buildQueryFunction(url.searchParams, conf)
				const limit = buildLimitQueryFunction(url.searchParams)
				const sort = buildSortQueryFunction(url.searchParams, conf)
				req.urlSearchParams = {
					query: query,
					sort: sort,
					limit: limit,
				}
				next()
			} catch (error) {
				next()
			}
		}
	},
}
export default GetQueryFromURL
