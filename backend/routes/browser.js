const { request, response } = require('express');
const express = require('express');

const browserRouter = express.Router();

browserRouter.get("/*", (request,response) => { 
    //# Returns any non-api routed request to the root. 
    //# All navigation is done via dom-routing, so this should only be triggered when a user first navigates to the application or when they refresh their browser
    response.status(404).redirect("/");
})

module.exports = browserRouter;