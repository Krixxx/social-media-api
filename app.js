require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

// file upload
const fileUpload = require('express-fileupload');

// cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// connect to database
const connectDB = require('./db/connect');
// import authentication middleWare
const authenticateUser = require('./middleware/authentication');
const logger = require('./middleware/logger');

// routers
const authRouter = require('./routes/authRouter');
const publicRouter = require('./routes/publicRouter');
const postsRouter = require('./routes/postsRouter');
const userRouter = require('./routes/userRouter');
const notificationRouter = require('./routes/notificationRouter');

// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// rateLimiter middleware
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 1 * 60 * 1000, max: 60 })); // max 60 tried per minute

// make public folder available
app.use(express.static('./public'));

// middleWare for req.body
app.use(express.json());

app.use(fileUpload({ useTempFiles: true }));

// security packages
app.use(helmet());
app.use(cors());
app.use(xss());

// main route
app.get('/', (req, res) => {
  res.send('Krix Social API');
});

// routes
app.use('/api/v1/auth', logger, authRouter);
app.use('/api/v1/public', logger, publicRouter);
app.use('/api/v1/posts', logger, authenticateUser, postsRouter);
app.use('/api/v1/users', logger, authenticateUser, userRouter);
app.use('/api/v1/notifications', logger, authenticateUser, notificationRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// set port - from environment variables or if not given, then default 5000
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
