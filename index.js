/*
* Primary file for the API
*
*/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder

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
    var headers = req.headers;

    // Get Payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data); // as data streams in, adds decoded data to buffer string
    });

    req.on('end', function () {
        buffer += decoder.end();

        // Send the response
        res.end('Response Sent!\n');

        // Log the request path
        console.log('=====================================================');
        console.log(`Request received on path: ${trimmedPath}`);
        console.log(`Method: ${method}`);
        console.log('Query String Parameters: ', JSON.stringify(queryStringObject));
        console.log('Headers: ', JSON.stringify(headers));
        console.log(`Payload: ${buffer}`);
    })
});

// Star the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000 now")
})