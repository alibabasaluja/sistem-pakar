const mongoose = require('mongoose');

const penyakitSchema = new mongoose.Schema({
    kode: {
        type : String,
        required : true
    },
    nama: {
        type : String,
        required: true
    },
    solusi:{
        type : String,
        required: true
    }
});
module.exports = mongoose.model('Penyakit', penyakitSchema);