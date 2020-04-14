const express = require('express');
const router = express.Router();
const Rules = require('../models/rules');
const Gejala = require('../models/gejala');
const Penyakit = require('../models/penyakit');


router.get('/', async(req, res)=>{  
    var i = 1;
    try{
        const rules = await Rules.find({});
        const gejala = await Gejala.find({});
        const penyakit = await Penyakit.find({});
        res.render('rules/index', 
                    {  rules    : rules,
                       gejala   : gejala,
                       penyakit : penyakit ,
                       index    : i

                    });
    }catch{
        res.redirect('/');
    }
});



router.post('/', (req, res) => {

       res.send('Test')

    
 });
module.exports = router;