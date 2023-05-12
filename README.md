# compare_objects_imjano

The function extracts the protocol and 'host' attribute from the req parameter to construct the URL.
It then creates a query object based on the URL, which will be used for querying a database using mongoose.
The constructed query object is then inserted into the req parameter for further processing in subsequent middleware or route handlers.

## Installation

```bash
npm install parse_url_to_query_middleware_imjano
```

## Usage

```javascript
const ParseUrlToQueryMiddleware = require('parse_url_to_query_middleware_imjano')

app.use(ParseUrlToQueryMiddleware.parse)

app.get('/example', async (req, res, next) => {
	const { query, sort, limit } = req
	let users = await UserModel.find(query).sort(sort).limit(limit)
	res.json(users).status(200)
})
```
