const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    amount : {type : Number},
    type : {type : String, enum :["income","expense"] },
    category : {type : String},
    date : {type : Date}
});



module.exports = mongoose.model("transaction",transactionSchema);