require('dotenv').config()

const { response } = require('express')
const express = require('express') 

const app = express() 
app.use(express.static('build'))

app.get("/test", (request,response) => {
    response.status(200).json({data:"some data"})
})

const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})