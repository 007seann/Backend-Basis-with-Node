import express from 'express';

const router = express.Router();

// Get all tweets
router.get('/', (req, res, next) => {
    
    res.status(200).send('GET: /tweets ');
});


// Get tweets by a given username
router.get('/?username=bob', (req, res, next) => {
    // need business logics
    if(req.query.username === 'bob') {
        res.status(200).send('GET: /tweets?username=');
    } else {
        res.status(404).send('Not Found');
    }
});

// Get tweets by a given id
router.get('/:id', (req, res, next) => {
    if(req.params.id === '1') {
        res.status(200).send('GET: /tweets/:id');
    } else {
        res.status(404).send('Not Found');
    }
});

export default router;