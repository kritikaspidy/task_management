require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorhandler');

const app = express();
app.use(cors({
  origin: "https://vercel.com/kritikas-projects-bb3a5330/primetrade/AbkAg7x2TZG1FVaHBwS6DsXTGvud",
  credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({
    challenge: 'Complete the Authentication Flow',
    instruction:
      'Complete the authentication flow and obtain a valid access token.',
  });
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', apiRoutes);
app.use('/api/v1', adminRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));