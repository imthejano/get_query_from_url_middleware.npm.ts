# Get query from URL

The function extracts construct a URL object from the request parameters.
It then creates a query object based on the URL query string, which will be used for querying a database using mongoose.
The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.

## Installation

```bash
npm install @imjano/get_query_from_url_mw
```

## Usage

import the middleware @imjano/get_query_from_url_mw

```javascript
const GetQueryFromURLMiddleware = require('@imjano/get_query_from_url_mw')
```

Now you can configure according to your project and insert it before your routes

```javascript
const getQueryFromURL = GetQueryFromURLMiddleware.configure({
	defaultFields: {
		id: '_id',
		timestampCreatedAt: 'createdAt',
		timestampUpdatedAt: 'updatedAt',
	},
})
app.use(getQueryFromURL)
```

let's suppose that the path of the request ends as follows

```bash
'example?from=2023-05-10'&param=name&equalTo=alex
```

req.queryFromURL has been injected with query objects

```javascript
{
	query: { createdAt: { '$gte': '2023-05-10' }, name: 'alex' },
	sort: { createdAt: -1 },
	limit: 100
}
```

Now you can execute the query

```javascript
app.get('/example', async (req, res, next) => {
	const { query, sort, limit } = req.queryFromURL
	let users = await UserModel.find(query).sort(sort).limit(limit)
	res.json(users).status(200)
})
```
