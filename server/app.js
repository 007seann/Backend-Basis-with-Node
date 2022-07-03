import express, { application } from 'express';
import 'express-async-error';

// To match client and server IP address using when ther are different.
import cors from 'cors';
// For debugging
import morgan from 'morgan';
// For security
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
// import userRouter from './router/user.js';
// import postRouter from './router/post.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
// app.use('/tweets', userRouter);
// app.use('/tweets', postRouter);

// Need to show "Not Found" when receiving a differenet URL
app.use((req, res, next) => {
  res.sendStatus(404);
});

// Error
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);

// how can I hand in body or contents?
