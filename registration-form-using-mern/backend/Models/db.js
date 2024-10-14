const mongoose = require('mongoose');
const MONGO_CONN = process.env.MONGO_CONN;

mongoose.connect(MONGO_CONN ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>{
    console.log("MongoDB Connect")
  })
  .catch((err)=> console.log('MongoDB Connection Error:' , err));

  