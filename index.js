/*
* Primary file for the API
*
*/

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder
var config = require('./config');
var fs = require('fs');

// Instantiating the HTTP server
var httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
});

// Start the HTTP server, and have it listen on environment port
httpServer.listen(config.httpPort, function () {
    console.log(`The server is listening on port ${config.httpPort} now in ${config.envName} mode`)
})

// Instantiate the HTTPS server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function () {
    console.log(`The server is listening on port ${config.httpsPort} now in ${config.envName} mode`)
})

// All the server logic for both http and https server
var unifiedServer = function(req, res) {
    
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // removes extrenous slashes

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

        // Choose the handler this request should go to. If one is not found, use the notFound handler
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request specfied in the router
        chosenHandler(data, function (statusCode, payload) {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // Convert payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log('=====================================================');
            console.log(`Status Code: ${statusCode}`);
            console.log(`Payload String: ${payloadString}`);
        });
    });
}

// Define our handlers
var handlers = {}

// Ping handler
handlers.ping = function(data, callback) {
    callback(200);
}


// Not Found handler
handlers.notFound = function(data, callback) {
    callback(404);
};

// Define a request router
var router = {
    'ping': handlers.ping,
    'notFound': handlers.notFound
};