import express from 'express';
let router = express.Router();

router.get('/home', (req, res)=>{
    res.send("This is home page");
});

router.get('/products', (req, res)=>{
    res.send('this is the products page');
});

export default router;