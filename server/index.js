const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app")
let server;
dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
mongoose.connect(db).then(con => {
  console.log("Connection Successfull");
  server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
  })
})

const port = process.env.PORT || 3000;

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

