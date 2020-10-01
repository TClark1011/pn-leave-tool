const { request, response } = require('express');
const express = require('express');

const browserRouter = express.Router();

browserRouter.get("/*", (request,response) => { //#Catch all
    response.status(404).redirect("/");
})

module.exports = browserRouter;