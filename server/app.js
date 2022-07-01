import express from 'express';
import userRouter from './router/user.js';
import postRouter from './router/post.js';


const app = express();

app.use(express.json());

app.use('/tweets', userRouter);
app.use('/tweets', postRouter);

app.listen(8080);