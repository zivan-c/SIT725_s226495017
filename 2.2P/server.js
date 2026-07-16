var express = require("express")
const path = require('path'); // Make sure to include this
var app = express()
var port = process.env.port || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to calculate the square of a number
// Example: http://localhost:3000/square?num=5

app.get('/add', (req, res) => {
    // Parse the numbers from the query parameters
    const a = parseFloat(req.query.num1);
    const b = parseFloat(req.query.num2);

    if (isNaN(a) || isNaN(b)){
        return res.send("Please enter valid numbers");
    }
    //calculate the sum
    const sum = a + b;

    //return result
    res.send(`The result of the addition of the numbers is ${sum}`)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});