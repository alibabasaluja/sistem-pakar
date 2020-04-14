const mongoose = require('mongoose');

const rulesSchema = new mongoose.Schema({
    kodeAturan  : {
        type        : String,
        required    : true
    },
    penyakit    : {
        type        : mongoose.Schema.Types.ObjectId,
        required    : true,
        ref         : 'Penyakit'
    },
    gejala      :[{
        type        : mongoose.Schema.Types.ObjectId,
        required    : true,
        ref         : 'Gejala'
    }]
  
});
module.exports = mongoose.model('Rules', rulesSchema);