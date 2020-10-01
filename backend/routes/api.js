const express = require('express');
const mongoose = require("mongoose");

const User = require("../models/user");

const apiRouter = express.Router();

//# LEAVE
apiRouter.get("/api/leave", (request,response) => { //# Fetch leave
    console.log("Received request to fetch 'leave' items")
    response.status(200).json({leave:"this will be data one day"})
})

//# USER REGISTRATION
apiRouter.post("/api/registerUser", (request,response) => { //# Register user
    console.log("Received request to register a new user")
    
    //TODO: Validate passed data
    //TODO: Check if account with passed employee_id already exists

    const userObj = {
        employee_number:request.body.employee_number,
        password:request.body.password
    }

    const newUser = new User(userObj);
    newUser.save().then(result => {
        console.log("new user data saved")
        response.status(200).json(userObj);
    })
})

apiRouter.get("/api/*", (request,response) => { //# Catch all
    response.status(404).json({error:"invalid api call (bad address)"})
})

module.exports = apiRouter;