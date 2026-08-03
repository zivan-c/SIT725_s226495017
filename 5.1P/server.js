const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'));
// Import route file
const booksRoutes = require('./routes/booksRoutes');

// Mount the route at /api/food
app.use('/api/books', booksRoutes);
// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Library!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});