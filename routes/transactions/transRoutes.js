const express = require('express');
const { transCreateCtrl, transGetCtrl, transGetAllCtrl, transDeleteCtrl, transUpdateCtrl } = require('../../controllers/transactions/transCtrl');

const transRoutes = express.Router();














module.exports = transRoutes;


// --------------------- posts -------------


transRoutes.post('/',transCreateCtrl);



transRoutes.get('/:id',transGetCtrl);


transRoutes.get('/',transGetAllCtrl);




transRoutes.delete('/:id',transDeleteCtrl);


transRoutes.put('/:id',transUpdateCtrl);
