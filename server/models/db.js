require('./student.model');
require('./admin.model');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection
  .once('open', () => console.log("connected"))
  .on('error', (error) => {
    console.log(error);
  })
