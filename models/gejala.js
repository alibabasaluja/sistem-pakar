const mongoose = require('mongoose');

const gejalaSchema = new mongoose.Schema({
    kode: {
        type : String,
        required : true
    },
    nama: {
        type : String,
        required: true
    }
  
});
module.exports = mongoose.model('Gejala', gejalaSchema);