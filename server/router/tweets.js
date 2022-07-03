import express, { application } from 'express';
import 'express-async-error';

let tweets = [
  {
    id: '1',
    text: 'How to improve my coding ability',
    date: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },

  {
    id: '2',
    text: 'Blueberry  ',
    date: Date.now().toString(),
    name: 'Sean',
    username: 'sean',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
// I need to know how to write this biz logic by myself.
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = id ? tweets.find((tweet) => tweet.id === id) : tweets;
  console.log(data);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweets

/* This version doesn't create a whole tweet including id and date.
 router.post('/', (req, res, next) => {
  const data = req.body;
  tweets.push(data);
  res.status(201).json(data);
});
*/

router.post('/', (req, res, next) => {
  const { text, username, name } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    date: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) {
    // throw new Error('tweet not found!!!');
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
  tweet.text = text;
  res.status(200).json(tweet);
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});
export default router;
