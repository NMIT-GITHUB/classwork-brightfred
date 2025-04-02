const express = require("express")
const path = require("path")
const http = require("http")

const app = express()

const publicPath = path.resolve(__dirname, "asset")
app.use(express.static(publicPath))

// Error handling middleware needs both req and res parameters
app.use((req, res) => {
    res.status(404).send("File not Found")  // Using Express's response methods
})

http.createServer(app).listen(3000, () => {
    console.log("Server started on port 3000")  // Added callback to know when server starts
})

function greeting(){
    console.log("hello")
}