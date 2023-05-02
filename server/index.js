const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app")
let server;
dotenv.config({ path: './config.env' });
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
const PORT = process.env.PORT || 3000;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Connect to the database before listening
connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
})

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection');
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});

