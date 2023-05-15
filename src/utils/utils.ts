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

const parseValue = (input: string): any => {
	const [type, valueString] = input.slice(0, -1).split('(')
	const value = getValueOfType(valueString, type)
	return value
}

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
export default {
	getValueOfType,
	parseValue,
	stringToNumber,
	getParsedValue,
}
