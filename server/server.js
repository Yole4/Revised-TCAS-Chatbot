const express = require('express');
const cors = require('cors');
require('dotenv').config();

// port number
const port = process.env.DB_PORT;

// import routes
const userRoutes = require('./routes/UsersRoutes');
const publicRoutes = require('./routes/PublicRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/assets', express.static('assets'));

// routers
app.use('/api/users', userRoutes);
app.use('/api/public', publicRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to TCAS Backend");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})