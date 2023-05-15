# Get query from URL

The function extracts the protocol and 'host' attribute from the req parameter to construct the URL.
It then creates a query object based on the URL, which will be used for querying a database using mongoose.
The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.

## Installation

```bash
npm install get_query_from_url_imjano
```

## Usage

import the middleware get_query_from_url_imjano

```javascript
const GetQueryFromURLMiddleware = require('get_query_from_url_imjano')
```

Now you can configure acording to your project and insert it before your routes

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
