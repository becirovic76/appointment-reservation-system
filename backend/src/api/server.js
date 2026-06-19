
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const buildContainer = require('./container');
const createRouter = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { getDatabase } = require('../infrastructure/database/connection');

const PORT = process.env.PORT || 3000;


getDatabase();

const app = express();
const container = buildContainer();

app.use(cors());
app.use(express.json());


const frontendPath = path.join(__dirname, '../../../frontend');
app.use(express.static(frontendPath));


app.use('/api', createRouter(container));


app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Appointment Reservation System API running on http://localhost:${PORT}`);
});
