const { request, response } = require('express');
const express = require('express');

const browserRouter = express.Router();

browserRouter.get("/*", (request,response) => { //#Catch all
    response.redirect("/");
})

module.exports = browserRouter;