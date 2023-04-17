const express = require('express');
const app = express();

app.get('/', (req, res) => {

  res.send('Hello from Lunch Box Server')
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})