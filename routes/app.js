const express = require('express');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController')
const auth = require('../middleware/auth')
const router = express.Router();

//user
router.post('/registerUser',userController.registerUser);
router.post('/login',userController.loginUser);

//transactions
router.post('/addtransaction',auth,transactionController.addtransaction);
router.get('/getAllTransaction',auth,transactionController.getAllTransaction);
router.put('/update/:id',auth,transactionController.updateTransaction);
router.delete('/delete/:id',auth,transactionController.deleteTransaction);

//transactionsReport
router.get('/transactions/report',auth,transactionController.transactionReport);


module.exports = router;