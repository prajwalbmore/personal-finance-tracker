const Transaction = require('../model/transactionModel');

async function addtransaction(req,res){
    try {
        const newTransaction = new Transaction(req.body);
        const result = await newTransaction.save();
        res.status(200).send({message :"Transaction added successfully",task : result});
    } catch (error) {
        res.status(500).send(error);
    } 
}

async function getAllTransaction(req,res){
    try {
        result = await Transaction.find({},{__v:0});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateTransaction(req,res){
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id,req.body,{new : true});
        if (!Transaction) {
            res.status(400).send({message : 'transaction not found'});
        }
        res.status(200).send({message : 'transaction Updated',transaction});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteTransaction(req,res){
    const id = req.params.id;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if(!transaction){
            res.status(400).send({message : 'transaction not found'});
        }
        res.status(200).send({message : 'transaction Deleted',transaction});
    } catch (error) { 
        res.status(500).send(error);
    }
} 


async function transactionReport(req,res){
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        if (!startDate || !endDate) {
            return res
              .status(400)
              .send({ error: "Startdate and Enddate is requires" });
          } 
          const start = new Date(startDate);
          const end = new Date(endDate);
          const transactions = await Transaction.find({
            date: { $gte: start, $lte: end },
          },{type : 1 , amount : 1});
        
          res.status(200).json(transactions);
       
 
          
    } catch (error) {
        res.status(500).send(error);   
    }
}


module.exports = {
    addtransaction,
    getAllTransaction,
    updateTransaction,
    deleteTransaction,
    transactionReport
}