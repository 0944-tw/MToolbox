const express = require("express")
const app = express()
app.use('/',require('./routes/chatbot'))
app.listen(3000)
