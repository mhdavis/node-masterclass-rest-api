/*
* Primary file for the API
*
*/

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function(req, res) {
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);
    
    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+s/g, ''); // removes extrenous slashes

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();


    // Get the Headers as an object:
    var headers = req.headers

    // Send the response
    res.end('Response Sent!\n');

    // Log the request path
    console.log('=====================================================')
    console.log(`Request received on path: ${trimmedPath}`)
    console.log(`Method: ${method}`)
    console.log('Query String Parameters: ', JSON.stringify(queryStringObject))
    console.log('Headers: ', JSON.stringify(headers))
});

// Star the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000 now")
})