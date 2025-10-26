const express = require('express');
const route = express.Router();
const MultiStepFromController = require('../../controllers/backend/multiStepForm.controller');


module.exports = app => {

    route.post('/add', MultiStepFromController.create);

    route.post('/view', MultiStepFromController.view);

    route.post('/details/:id', MultiStepFromController.details)
    route.put('/statuschange', MultiStepFromController.statuschange)
    
    route.delete('/delete/:id', MultiStepFromController.delete)
    route.put('/update/:id', MultiStepFromController.update)

    app.use('/api/backend/MultiStepFrom',route);
    

}
// http://localhost:5000/api/backend/MultiStepFrom/add
// http://localhost:5000/api/backend/MultiStepFrom/view
// http://localhost:5000/api/backend/MultiStepFrom/delete/:id
// http://localhost:5000/api/backend/MultiStepFrom/statuschange
// http://localhost:5000/api/backend/MultiStepFrom/details
// http://localhost:5000/api/backend/MultiStepFrom/update/id