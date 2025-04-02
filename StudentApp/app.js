const http = require("http")
const express = require("express")
const path = require("path")
const bodyparser = require("body-parser") // to parse json (incoming request body (url))


const app = express()

const entries = []
app.locals.entries = entries // i define my define my entries as a const and empty array. this is a placeholder for entries.(for the new-entry.ejs)
let entryId = 1


app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(bodyparser.urlencoded({ extended: false }))  // Fixed object syntax
app.get("/", (req, res) => {   // Added proper arrow function block
    res.render("index")
})

app.get("/new-entry", (req, res) => {
    res.render("new-entry")
})

app.post("/new-entry", (req, res) => {  // Added missing forward slash
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and an information body.")
        return
    }
    const newEntry = {
        id: entryId++,
        title: req.body.title,
        body: req.body.body,    
        published: new Date()
    }
    entries.push(newEntry)
    res.redirect("/")          
})

app.get("/edit-entry/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const entry = entries.find(e => e.id === id)
    if (!entry) {
        res.status(404).send("Entry not found!")
        return
    }
    res.render("edit-entry", { entry })
})

app.post("/edit-entry/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const entry = entries.find(e => e.id === id)
    if (!entry) {
        res.status(404).send("Entry not found!")
        return
    } 
    if (!req.body.title || !req.body.body) {
        res.status(404).send("Both title and text body are required")
        return
    }
    
    // Update existing entry
    entry.title = req.body.title
    entry.body = req.body.body
    entry.lastEdited = new Date()
    
    res.redirect("/")
})

app.post("/delete-entry/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = entries.findIndex(e => e.id === id)
    if (index === -1) {
        res.status(404).send("Entry not found")
        return
    }
    entries.splice(index, 1)
    res.redirect("/")
})

app.use((req, res) => {
    res.status(404).render("404")
})

http.createServer(app).listen(3000, () => {
    console.log("Server started on port 3000")  // Added callback to know when server starts
})