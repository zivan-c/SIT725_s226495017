const express = require('express');
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/booksDB');

mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
});


const app = express();
app.use(express.static(__dirname, '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const bookRoutes = require('./routes/bookRoute');

app.use('/', bookRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Library');
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}!`);
})

