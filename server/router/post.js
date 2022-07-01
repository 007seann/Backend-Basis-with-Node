import express from "express";


const router = express.Router();

// Create Tweet
router.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(201).send("Post: /tweets");
});

// Update Tweet
router.put('/:id', (req, res) => {
    if(req.params.id === '1') {
        res.status(201).send('PUT: /:id');
    } else {
        res.status(404).send('Not Found');
    }
});

// Delete Tweet
router.delete('/:id', (req, res) => {
    
    res.status(204).send('Sucessfully deleted')
});


export default router;