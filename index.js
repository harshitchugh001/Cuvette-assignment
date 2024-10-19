const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// connect to db
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error('DB Connection Error:', err));

mongoose.connection.on("error", err => {
  console.error(`DB connection error: ${err.message}`);
});


// import routes
const authRoutes = require('./Routes/Auth');
const jobRoutes = require('./Routes/Job');
// app middlewares
app.use(cors()); 
app.use(morgan('dev'));
app.use(bodyParser.json());
// JSON.parse()



app.get('/', (req, res) => {
  res.send('Hello Harshit Backend is UP!!');
});

app.use('/api', authRoutes);
app.use('/api', jobRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

module.exports = app;