 const express = require('express');

const dotenv = require('dotenv');
const userRouter = require('./routes/users/userRoutes');
const transRoutes = require('./routes/transactions/transRoutes');
const pagesRoutes = require('./routes/pages/pagesRoutes');

dotenv.config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./config/dbConnect');
const app = express();
app.use(cookieParser());
//ANCHOR - 
// register static
app.use(express.static('public'));
// set template engine
app.set('view engine','ejs');





//SECTION - Middleware 
//NOTE - this mw is for leting our api to parse json data then we can save it to DB
app.use(express.json())
//NOTE - this mw is for leting our api to parse html form data so the tag name = json name
app.use(bodyParser.urlencoded({ extended: false }));


//SECTION - Route section
app.use('/',pagesRoutes);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/transactions',transRoutes);










// ---------------------- / posts ----------
// Error handle middleware
// listen to server


const PORT = process.env.PORT || 9000;

app.listen(PORT,console.log(`server listening on port ${PORT}`));