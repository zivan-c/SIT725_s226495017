var express = require('express')
const path = require('path');
var app = express()
var port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/multiple', (req, res) => {

  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide two valid numbers using query parameters 'a' and 'b'.");
  }
  
  const product = a * b;
  
  res.send(`The product of ${a} and ${b} is: ${product}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});