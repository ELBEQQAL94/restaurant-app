const mongoose = require('mongoose');
const app = require('./app');

// connect to mongodb
// connect mongoose to database
const db = process.env.MONGOURI;

mongoose.set('useFindAndModify', false);
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => { console.log('Mongodb is connected..'); },
);

// hundle database error
mongoose.connection.on('error', (err) => console.log('DB connection error:', err.message));


const port = process.env.PORT || 8080;


// server running on port:8080
app.listen(port, () => console.log(`Server run on port:${port}`));
