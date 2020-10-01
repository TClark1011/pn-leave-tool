require('dotenv').config()
const express = require('express') 
const apiRouter = require('./routes/api');
const browserRouter = require('./routes/browser');

const app = express();
app.use(express.json());
app.use(apiRouter);
app.use(browserRouter);
app.use(express.static('build'))

const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})