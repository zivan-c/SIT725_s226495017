var express = require('express')
const path = require('path');
var app = express()
var port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("API works");
});


app.get('/multiply', (req, res) => {

  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
   return res.status(400).send("Error: Please provide two valid numbers using query parameters 'a' and 'b'.");
  }
  
  const product = a * b;
  
  res.status(200).send(`The product of ${a} and ${b} is: ${product}`);

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});