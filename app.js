// Sample app.js - To be changed

const express = require('express')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session')

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})