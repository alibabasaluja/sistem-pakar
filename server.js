if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

//Router
const indexRouter = require('./routes/index');
const penyakitRouter = require('./routes/penyakit');
const gejalaRouter = require('./routes/gejala');
const rulesRouter = require('./routes/rules');
const clientRouter = require('./routes/client');



// Database
mongoose.connect(process.env.DATABASE_URL, {    
    useUnifiedTopology: true,
    useNewUrlParser : true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


// Express
app.listen(process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/penyakit', penyakitRouter);
app.use('/gejala', gejalaRouter);
app.use('/rules', rulesRouter);
app.use('/client', clientRouter);


