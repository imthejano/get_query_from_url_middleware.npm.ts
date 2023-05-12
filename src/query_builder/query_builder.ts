import { IParseURLToQueryMiddlewareConfig } from '../types/types'

const stringToNumber = (str: string, def: number): number => {
	try {
		let num = parseInt(str)
		if (!isNaN(num)) return num
		num = parseFloat(str)
		if (!isNaN(num)) return num
		return def
	} catch (error) {
		return def
	}
}

const getParsedValue = (str: string): any => {
	if (
		(str.includes('int(') ||
			str.includes('float(') ||
			str.includes('bool(') ||
			str.includes('str(')) &&
		str.endsWith(')')
	) {
		try {
			return parseValue(str)
		} catch (error) {
			return str
		}
	}
	return str
}

/**
 *
 * @author chatgpt
 * method created by chatgpt
 */
const parseValue = (input: string): any => {
	const [type, valueString] = input.slice(0, -1).split('(')
	const value = getValueOfType(valueString, type)
	return value
}

/**
 *
 * @author chatgpt
 * method created by chatgpt
 */
const getValueOfType = (valueString: string, type: string): any => {
	switch (type) {
		case 'int':
			return parseInt(valueString)
		case 'float':
			return parseFloat(valueString)
		case 'bool':
			return valueString === 'true'
		case 'str':
			return valueString
		default:
			throw new Error(`type is not valid: ${type}`)
	}
}

const QueryBuilder = {
	buildLimitQuery(
		params: URLSearchParams,
		maxLimit: number = 1000,
		minLimit: number = 1,
		defLimit: number = 100
	): number {
		const limit = Math.floor(
			stringToNumber(params.get('maxDocs') ?? '', defLimit)
		)
		if (limit > maxLimit) return maxLimit
		if (limit < minLimit) return minLimit
		return limit
	},

	buildQuery(
		params: URLSearchParams,
		config?: IParseURLToQueryMiddlewareConfig
	): Record<string, any> {
		const createdAtField =
			config?.defaultFields?.timestampCreatedAt ?? 'createdAt'
		const updatedAtField =
			config?.defaultFields?.timestampUpdatedAt ?? 'updatedAt'
		const idField = config?.defaultFields?.id ?? '_id'
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
			query[params.get('param')!].$gte = getParsedValue(
				params.get('moreThan')!
			)
		if (params.get('lessThan'))
			query[params.get('param')!].$lte = getParsedValue(
				params.get('lessThan')!
			)
		if (params.get('equalTo'))
			query[params.get('param')!] = getParsedValue(params.get('equalTo')!)
		if (params.get('id'))
			query[idField!] = getParsedValue(params.get('equalTo')!)
		return query
	},

	buildSortQuery(
		params: URLSearchParams,
		config?: IParseURLToQueryMiddlewareConfig
	): Record<string, any> {
		const createdAtField =
			config?.defaultFields?.timestampCreatedAt ?? 'createdAt'
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
