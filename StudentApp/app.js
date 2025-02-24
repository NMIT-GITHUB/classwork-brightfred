const http = require("http")
const express = require("express")
const path = require("path")
const bodyparser = require("body-parser") // to parse json (incoming request body (url))


const app = express()

const entries = []
app.locals.entries = entries // i define my define my entries as a const and empty array. this is a placeholder for entries.(for the new-entry.ejs)

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine","ejs")

app.use(bodyparser.urlencoded({ extended: false }))  // Fixed object syntax
app.get("/", (req, res) => {   // Added proper arrow function block
    res.render("index")
})

app.get("/new-entry", (req, res) => {
    res.render("new-entry")
})

app.post("/new-entry", (req, res) => {  // Added missing forward slash
    if(!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and an information body.")
        return
    }
    entries.push({
        title: req.body.title,
        body: req.body.body,    // Fixed indentation
        published: new Date()
    })
    res.redirect("/")          // Moved inside the function block
})


http.createServer(app).listen(3000, () => {
    console.log("Server started on port 3000")  // Added callback to know when server starts
})

