require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();

// import securty libraries
const helmet = require('helmet')
const cros = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit') 
// error handler
const authMiddleware = require('./middelware/authMiddleware');
const notFoundMiddleware = require('./middelware/not-found');
const errorHandlerMiddleware = require('./middelware/error-handler');
// require connectDb
const connectDB = require('./db/connect')
// require our routes
const jobsRoute = require('./routes/jobsRoute')
const authRoute = require('./routes/authRoute')

app.use(express.json());
// extra packages
app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(cros())
app.use(xss())
// our routes here
app.use('/api/v1/auth' , authRoute)
app.use('/api/v1/jobs' , authMiddleware ,jobsRoute)
// our middelware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
     await connectDB(process.env.MONGO_URL)
     app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
     );
  } catch (error) {
    console.log(error);
  }
};

start();