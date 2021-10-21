const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;;

app.use(cors());
app.use(express.json());


//Connect to MongoDB
mongoose.connect(process.env.URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//Testing connection
mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
});


const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);


app.listen(port, () => {
    //Testing server
    console.log('Listening on port: ' + port);
});
