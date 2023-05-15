export type TGetQueryFromURLMiddleware = (req: any, res: any, next: any) => void
export type TRequest = {
	protocol: string
	get: any
	originalUrl: string
	parsedURL?: URL
	queryFromURL?: TRequestqueryFromURL
}

export type TRequestqueryFromURL = {
	query: any
	limit: number
	sort: any
}

export interface IGetQueryFromURLConfigDefaultFields {
	/**
	 * @description lets you specify the name of the timestamp createdAt field in your database
	 * @default createdAt
	 */
	timestampCreatedAt: string
	/**
	 * @description lets you specify the name of the timestamp updatedAt field in your database
	 * @default updatedAt
	 */
	timestampUpdatedAt: string
	/**
	 * @description lets you specify the name of the id field in your database
	 * @default _id
	 */
	id: string
}

export interface IGetQueryFromURLConfig {
	defaultFields?: IGetQueryFromURLConfigDefaultFields
	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns void
	 * @description customize the function that will inject the query objects to the request parameter
	 * @example
	 * (req: any, res: any, next: any) {
		const urlString = `${req.protocol}://${req.get('host')}${
			req.originalUrl
		}`
		const url = new URL(urlString)
		const query = buildQuery(url.searchParams)
		const limit = buildLimitQuery(url.searchParams)
		const sort = buildSortQuery(url.searchParams)
		req.parsedURL = url
		req.queryFromURL = {
			query: query,
			sort: sort,
			limit: limit,
		}
		next()
	 * }
	 */
	queryGetterFunction?: (request: any, ressponse: any, next: any) => void
}
