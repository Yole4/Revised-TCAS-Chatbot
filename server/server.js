const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const nodemailer = require('nodemailer');

// port number
const port = process.env.DB_PORT;

// import routes
const userRoutes = require('./routes/UsersRoutes');
const publicRoutes = require('./routes/PublicRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const chatbotRoutes = require('./routes/ChatbotRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/assets', express.static('assets'));

// routers
app.use('/api/users', userRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to TCAS Backend");
});

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'shelomora60@gmail.com',
//         pass: 'clvqembmjluvefqr'
//     }
// });

// var mailOptions = {
//     from: 'shelomora60@gmail.com',
//     to: "shelomora13@gmail.com",
//     subject: 'Your verification code!',
//     text: "Testing"
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("sent success!");
//     }
// });

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})