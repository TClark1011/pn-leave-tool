const { request, response } = require('express');
const express = require('express');

const apiRouter = express.Router();

apiRouter.get("/api/leave", (request,response) => { //# Catch all
    response.status(200).json({leave:"this will be data one day"})
})

apiRouter.get("/api/*", (request,response) => { //# Catch all
    response.status(404).json({error:"invalid api call (bad address)"})
})

module.exports = apiRouter;