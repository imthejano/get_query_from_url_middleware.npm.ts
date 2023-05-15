import { IGetQueryFromURLConfigDefaultFields } from '../types/types'
import utils from '../utils/utils'

const QueryBuilder = {
	buildLimitQuery(
		params: URLSearchParams,
		maxLimit: number = 1000,
		minLimit: number = 1,
		defLimit: number = 100
	): number {
		const limit = Math.floor(
			utils.stringToNumber(params.get('maxDocs') ?? '', defLimit)
		)
		if (limit > maxLimit) return maxLimit
		if (limit < minLimit) return minLimit
		return limit
	},

	buildQuery(
		params: URLSearchParams,
		defaultFields?: IGetQueryFromURLConfigDefaultFields
	): Record<string, any> {
		const createdAtField = defaultFields?.timestampCreatedAt ?? 'createdAt'
		const updatedAtField = defaultFields?.timestampUpdatedAt ?? 'updatedAt'
		const idField = defaultFields?.id ?? '_id'
		let query: Record<string, any> = {}
		if (params.get('from') || params.get('to')) query[createdAtField] = {}
		if (params.get('from')) query[createdAtField].$gte = params.get('from')
		if (params.get('to')) query[createdAtField].$lte = params.get('to')
		if (params.get('updatedFrom') || params.get('updatedTo'))
			query[updatedAtField] = {}
		if (params.get('updatedFrom'))
			query[updatedAtField].$gte = params.get('updatedFrom')
		if (params.get('updatedTo'))
			query[updatedAtField].$lte = params.get('updatedTo')
		if (params.get('param')) query[params.get('param')!] = {}
		if (params.get('moreThan'))
			query[params.get('param')!].$gte = utils.getParsedValue(
				params.get('moreThan')!
			)
		if (params.get('lessThan'))
			query[params.get('param')!].$lte = utils.getParsedValue(
				params.get('lessThan')!
			)
		if (params.get('equalTo'))
			query[params.get('param')!] = utils.getParsedValue(
				params.get('equalTo')!
			)
		if (params.get('id'))
			query[idField!] = utils.getParsedValue(params.get('id')!)
		return query
	},

	buildSortQuery(
		params: URLSearchParams,
		defaultFields?: IGetQueryFromURLConfigDefaultFields
	): Record<string, any> {
		const createdAtField = defaultFields?.timestampCreatedAt ?? 'createdAt'
		let query: Record<string, any> = {}
		let sort = -1
		switch (params.get('order') ?? -1) {
			case 'asc':
				sort = 1
				break
			case 'desc':
				sort = -1
				break
			case '1':
				sort = 1
				break
			case '-1':
				sort = -1
				break
		}
		if (params.get('order') == 'asc') sort = 1
		if (params.get('order') == 'desc') sort = -1
		if (params.get('order') == '1') sort = 1
		if (params.get('order') == '-1') sort = -1
		query[params.get('orderBy') ?? createdAtField] = sort
		return query
	},
}

export default QueryBuilder
