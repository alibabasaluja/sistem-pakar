const express = require('express');
const router = express.Router();
const Penyakit = require('../models/penyakit');

// Menampilkan semua penyakit
router.get('/', async (req, res)=>{
    try{
        const penyakit = await Penyakit.find({});
        res.render('penyakit/index', {penyakit: penyakit});
    }catch{
        res.redirect('/');
    }
    
});

// Menampilkan penyakit baru
router.get('/new', (req, res)=>{
    res.render('penyakit/new', {penyakit: new Penyakit()});
});

router.get('/:id', (req, res)=>{
    res.send('Show Penyakit ' + req.params.id);
});

router.get('/:id/edit', async (req, res)=>{   

    try{
    const penyakit = await Penyakit.findById(req.params.id);
    res.render('penyakit/edit', {penyakit: penyakit});
    }catch{
    res.redirect('/penyakit');
    }

    
});

router.put('/:id', async (req, res)=>{
    let updatePenyakit;
       try{
            updatePenyakit = await Penyakit.findById(req.params.id);
            updatePenyakit.kode = req.body.kodePenyakit;
            updatePenyakit.nama = req.body.namaPenyakit;
            updatePenyakit.solusi = req.body.solusiPenyakit;
            await updatePenyakit.save();
            res.redirect('/penyakit');
       }catch{
           if(updatePenyakit == null){
            res.redirect('/')
           }
           res.render('penyakit/edit', {
            updatePenyakit: updatePenyakit,
            errorMessage: "Error Mengedit Penyakit"
           })
       }
});

router.delete('/:id', async(req, res)=>{
    let deletePenyakit;
       try{
            const deletePenyakit = await Penyakit.findById(req.params.id);         
            await deletePenyakit.remove();
            res.redirect('/penyakit');
       }catch{
           if(deletePenyakit == null){
            res.redirect('/')
           }else{
               res.redirect('/penyakit')
           }
       }
});



// Menambahkan penyakit
router.post('/', async (req, res) => {
   const penyakit = new Penyakit({
    kode   : req.body.kodePenyakit,
    nama   : req.body.namaPenyakit,
    solusi : req.body.solusiPenyakit
   });
   try{
        const newPenyakit = await penyakit.save();
        res.redirect('penyakit');
   }catch{
       res.render('penyakit/new', {
           penyakit: penyakit,
           errorMessage: "Error creating penyakit"
       })
   }
});

module.exports = router;