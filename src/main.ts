import QueryBuilder from './query_builder/query_builder'
import {
	IGetQueryFromURLConfig,
	TGetQueryFromURLMiddleware,
} from './types/types'
import defaultFunction from './default_parser'

let getQueryFromURL: TGetQueryFromURLMiddleware = defaultFunction

const GetQueryFromURLMiddleware = {
	configure: (
		config?: IGetQueryFromURLConfig
	): TGetQueryFromURLMiddleware => {
		if (!config) getQueryFromURL = defaultFunction
		else {
			if (config.defaultFields) {
				getQueryFromURL = (request: any, ressponse: any, next: any) => {
					try {
						const urlString = `${request.protocol}://${request.get(
							'host'
						)}${request.originalUrl}`
						const url = new URL(urlString)
						const query = QueryBuilder.buildQuery(url.searchParams)
						const limit = QueryBuilder.buildLimitQuery(
							url.searchParams
						)
						const sort = QueryBuilder.buildSortQuery(
							url.searchParams
						)
						request.parsedURL = url
						request.queryFromURL = {
							query: query,
							sort: sort,
							limit: limit,
						}
						next()
					} catch (error) {
						next()
					}
				}
			} else if (config.queryGetterFunction)
				getQueryFromURL = config.queryGetterFunction
		}
		return getQueryFromURL
	},
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
	getQueryFromURL,
}
export default GetQueryFromURLMiddleware
