require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

// connect to database
const connectDB = require('./db/connect');
// import authentication middleWare
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');
const userRouter = require('./routes/userRouter');

// errorhandlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// rateLimiter middleware
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

// make public folder available
app.use(express.static('./public'));

// middleWare for req.body
app.use(express.json());

// security packages
app.use(helmet());
app.use(cors());
app.use(xss());

// main route
app.get('/', (req, res) => {
  res.send('Kristjan Social API');
});

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', authenticateUser, postsRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
// likeRoutes
// commentRoutes
// notificationRoutes

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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