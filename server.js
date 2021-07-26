const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const pageNotFoundRouter = require('./routes/pageNotFound');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('./swagger.json');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
dotenv.config();

app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// production script needed
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDoc)
// );
// app.use('/api/v1', sqlRouter);

// mongoose
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: 1,
    connectTimeoutMS: 60000,
    dbName: process.env.DB_NAME
  },
  () => console.log(`Connected to database.`)
);

// db events
// mongoose.connection.on('connected', () => {
//   console.log(`Connected to database.`);
//   // logger.info(`Connected to database.`);
//
//   app.listen(PORT, () => {
//     console.log(
//       `Server started at http://localhost:${PORT}...`
//     );
//   });
// });

// mongoose.connection.on('reconnected', () => {
//   console.log(`Reconnected to database.`);
//   // logger.info(`Reconnected to database.`);
// });

// mongoose.connection.on('error', (err) => {
//   console.log(`Database connection error: ${err.message}.`);
//   // mailer(`Database connection error: ${err.message}`);
//   // logger.error(`Database connection error: ${err.message}`);
// });

// log every request - response
// app.use((req, res, next) => {
// request
// console.log(
//   JSON.stringify({
//     headers: req.headers,
//     remote: req._remoteAddress,
//     url: req.url,
//     method: req.method,
//     body: req.body
//   })
// );
// logger.info(
// 	JSON.stringify({
// 		headers: req.headers,
// 		remote: req._remoteAddress,
// 		url: req.url,
// 		method: req.method,
// 		body: req.body
// 	})
// );
// response
// res.on('finish', () => {
//   console.log(
//     JSON.stringify({
//       statusCode: res.statusCode,
//       statusMessage: res.statusMessage,
//       headers: res._header,
//       body: res.send
//     })
//   );
//   // logger.info(
//   // 	JSON.stringify({
//   // 		statusCode: res.statusCode,
//   // 		statusMessage: res.statusMessage,
//   // 		headers: res._header,
//   // 		body: res.send
//   // 	})
//   // );
// });
// next();
// });

// routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('*', pageNotFoundRouter);

module.exports = app;
