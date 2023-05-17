import QueryBuilder from './query_builder/query_builder'
import {
	IGetQueryFromURLConfig,
	TGetQueryFromURLMiddleware,
} from './types/types'
import defaultFunction from './default_parser'

export default class GetQueryFromURLMiddleware {
	/**
	 * @description The function extracts construct a URL object from the request parameters.
	 * It then creates a query object based on the URL query string, which will be used for querying a database using mongoose.
	 * The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.
	 * @example
	 * app.get('/foo',
	 * 	getQueryFromURL,
	 * 	async (req, res, next) => {
	 * 		const { query, sort, limit } = req.queryFromURL
	 * 		const users = await UserModel.find(query).sort(sort).limit(limit)
	 * 		res.json(users).status(200)
	 * 	}
	 * )
	 */
	static getQueryFromURL: TGetQueryFromURLMiddleware = defaultFunction

	/**
	 *
	 * @param config
	 * @returns getQueryFromURL
	 * @example
	 * const defaultFields = {
	 * 	createdAt: 'created_at',
	 * 	id: '_id'
	 * }
	 * const conf = { defaultFields }
	 * const getQueryMiddleware = GetQueryFromURLMiddleware.configure(conf)
	 */
	static configure(
		config: IGetQueryFromURLConfig
	): TGetQueryFromURLMiddleware {
		if (!config) GetQueryFromURLMiddleware.getQueryFromURL = defaultFunction
		else {
			if (config.defaultFields) {
				GetQueryFromURLMiddleware.getQueryFromURL = (
					request: any,
					ressponse: any,
					next: any
				) => {
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
				GetQueryFromURLMiddleware.getQueryFromURL =
					config.queryGetterFunction
		}
		GetQueryFromURLMiddleware.getQueryFromURL =
			GetQueryFromURLMiddleware.getQueryFromURL
		return GetQueryFromURLMiddleware.getQueryFromURL
	}

	constructor(config: IGetQueryFromURLConfig) {
		GetQueryFromURLMiddleware.configure(config)
	}
}
