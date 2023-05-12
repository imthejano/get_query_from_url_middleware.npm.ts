export type TRequest = {
	protocol: string
	get: any
	originalUrl: string
	parsedUrl?: URL
	urlSearchParams?: TRequestURLSearchParams
}

export type TRequestURLSearchParams = {
	query: any
	limit: number
	sort: any
}

export interface IParseURLToQueryMiddlewareConfig {
	defaultFields: {
		/**
		 * @description lets you specify the name of the timestamp createdAt field in your database
		 * @default createdAt
		 */
		timestampCreatedAt?: string
		/**
		 * @description lets you specify the name of the timestamp updatedAt field in your database
		 * @default updatedAt
		 */
		timestampUpdatedAt?: string
		/**
		 * @description lets you specify the name of the id field in your database
		 * @default _id
		 */
		id?: string
	}
	parserFunctions: {
		/**
		 * @description allows you to customize the method to parse the query limit
		 */
		buildLimitQuery?: (searchParams: URLSearchParams) => number

		/**
		 * @description allows you to customize the method to parse the query object
		 */
		buildQuery?: (
			searchParams: URLSearchParams,
			config?: IParseURLToQueryMiddlewareConfig
		) => Record<string, any> | null

		/**
		 * @description allows you to customize the method to parse the query sort
		 */
		buildSortQuery?: (
			searchParams: URLSearchParams,
			config?: IParseURLToQueryMiddlewareConfig
		) => Record<string, any> | null
	}
}
