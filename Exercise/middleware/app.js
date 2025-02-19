const express = require("express")
const morgan = require("morgan")

const app = express()

app.use((req, res, next) => { 
    if (req.url === "/") {
        next()
    } else if (req.url === "/throw") {
        throw new Error("Wrong path!")
    } else {
        next("you did not visit the root")
    }
})

app.use((req, res) => { 
    res.send("Welcome to the homepage.")
})

app.use((error, req, res, next) => {
    console.error(error)  
    res.status(500)
    next(error)  
})

app.use((err, req, res, next) => {
    res.send("Error Message: " + err)
})

app.listen(3000, () => { console.log("App Started on port 3000") })