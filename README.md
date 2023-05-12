# Get query from URL

The function extracts the protocol and 'host' attribute from the req parameter to construct the URL.
It then creates a query object based on the URL, which will be used for querying a database using mongoose.
The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.

## Installation

```bash
npm install parse_url_to_query_middleware_imjano
```

## Usage

```javascript
const GetQueryFromUrl = require('get_query_from_url_middleware_imjano')

app.use(GetQueryFromUrl.parse)

/**
let's suppose that the path of the request ends as follows
'example?from=2023-05-10'&param=name&equalTo=alex
 */
app.get('/example', async (req, res, next) => {
	const { query, sort, limit } = req.urlSearchParams
	/**
	 * req.urlSearchParams has been injected with query objects
	 * {
		query: { createdAt: { '$gte': '2023-05-10' }, name: 'alex' },
		sort: { createdAt: -1 },
		limit: 100
	}
	 */
	let users = await UserModel.find(query).sort(sort).limit(limit)
	res.json(users).status(200)
})
```
