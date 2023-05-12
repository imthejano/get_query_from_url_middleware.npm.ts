declare namespace ParseURLToQueryMiddleware {
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
	function parse(req: any, res: any, next: any)

	interface IParseURLToQueryMiddlewareConfig {
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
			buildLimitQuery(searchParams: URLSearchParams)

			/**
			 * @description allows you to customize the method to parse the query object
			 */
			buildQuery(searchParams: URLSearchParams)

			/**
			 * @description allows you to customize the method to parse the query sort
			 */
			buildSortQuery(searchParams: URLSearchParams)
		}
	}
}

export default ParseURLToQueryMiddleware
