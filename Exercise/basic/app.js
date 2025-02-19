//Calling express library
const express = require("express") //use express.js module
const log = require("morgan") //use morgan module
const http = require("http") // use http module

const app = express() // create express.js app

app.use((req, res, next) => { // request, response, next function (callback function)
    const minute = new Date().getMinutes()  // Create a constant that holds the current time in minutes
    if (minute % 2 === 0) { // if current time in minutes remainder of 2 equals 0
        next()// continue to the next function

    } else { // otherwise
        res.statusCode = 403 // provide the error code (forbidden error)
        res.end("Not authorized") // end the response providing the reason
    }
})

app.use((req, res)=>{
    res.writeHead(200, { "content-type": "text/plain" }) // create a callback handler request, status code 200, content plain text
    res.end("Hello world!")
}
)

http.createServer(app).listen(3000) // create local server using port 3000


