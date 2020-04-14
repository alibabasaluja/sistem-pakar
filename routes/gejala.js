const express = require('express');
const router = express.Router();
const Gejala = require('../models/gejala');

// Menampilkan semua penyakit
router.get('/', async(req, res)=>{
    try{
        const gejala = await Gejala.find({});
        res.render('gejala/index', {gejala: gejala});
    }catch{
        res.redirect('/');
    }
});

// Menampilkan gejala baru
router.get('/new', (req, res)=>{
    res.render('gejala/new', {gejala: new Gejala()});
});


router.get('/:id', (req, res)=>{
    res.send('Show Gejala ' + req.params.id);
});

router.get('/:id/edit', async (req, res)=>{   

    try{
    const gejala = await Gejala.findById(req.params.id);
    res.render('gejala/edit', {gejala: gejala});
    }catch{
    res.redirect('/gejala');
    }

    
});

router.put('/:id', async (req, res)=>{
    let updateGejala;
       try{
            updateGejala = await Gejala.findById(req.params.id);
            updateGejala.kode = req.body.kodeGejala;
            updateGejala.nama = req.body.namaGejala;
            await updateGejala.save();
            res.redirect('/gejala');
       }catch{
           if(updateGejala == null){
            res.redirect('/')
           }
           res.render('gejala/edit', {
               updateGejala: updateGejala,
               errorMessage: "Error Mengedit Gejala"
           })
       }
});

router.delete('/:id', async(req, res)=>{
    let deleteGejala;
       try{
            const deleteGejala = await Gejala.findById(req.params.id);         
            await deleteGejala.remove();
            res.redirect('/gejala');
       }catch{
           if(deleteGejala == null){
            res.redirect('/')
           }else{
               res.redirect('/gejala')
           }
       }
});


// Menambahkan gejala
router.post('/', async (req, res) => {
    const gejala = new Gejala({
        kode   : req.body.kodeGejala,
        nama   : req.body.namaGejala,       
       });
       try{
            const newGejala = await gejala.save();
            res.redirect('gejala');
       }catch{
           res.render('gejala/new', {
               gejala: gejala,
               errorMessage: "Error Menambahkan Gejala"
           })
       }
});

module.exports = router;