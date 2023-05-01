const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app")

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
mongoose.connect(db).then(con => {
  console.log("Connection Successfull");
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});