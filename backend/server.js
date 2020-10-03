require('dotenv').config();
const express = require('express');

//# Request routes are handled in external files
const apiRouter = require('./routes/api');
const browserRouter = require('./routes/browser');

const app = express();
app.use(express.json());

app.use(apiRouter);
app.use(browserRouter); //* The browserRouter must be the last router called via '.use()', otherwise its catch all route will catch requests intended for a router beneath it

app.use(express.static('build'))

const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})