const mongoose = require('mongoose');

const diagnosaSchema = new mongoose.Schema({
    
    nama: {
        type : String,
        required: true
    }
  
});
module.exports = mongoose.model('Diagnosa', diagnosaSchema);