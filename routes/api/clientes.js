const router = require('express').Router();
const Cliente = require('../../models/cliente');


//GET http://localhost:3000/api/clientes/getall
router.get('/getall', async(req, res) => {
    const rows = await Cliente.getAll();
    res.json(rows);
})


//GET http://localhost:3000/api/clientes/23
router.get('/:clienteId', async(req, res) => {
    const result = await Cliente.getById(req.params.clienteId);
    res.json(result);
})


//POST http://localhost:3000/api/clientes/create
router.post('/create', async(req, res) => {
    const result = await Cliente.create(req.body);
    res.json(result);
    /*  
     if (result['affectedRows'] === 1) {
        
         res.json({ success: 'El cliente creado' });
     } else {
         res.json({ error: "El cliente no se ha creado" });
     } */
    //res.json(result);
});


//PUT http://localhost:3000/api/clientes/update
router.put('/update', async(req, res) => {
    const result = await Cliente.update(req.body);
    if (result['affectedRows'] === 1) {

        res.json({ success: 'El cliente se ha actualizado' });
    } else {
        res.json({ error: "El cliente no se ha actualizado" });
    }
    //res.json(result);
});

//DELETE http://localhost:3000/api/clientes/delete
router.delete('/delete', async(req, res) => {
    const result = await Cliente.deleteById(req.body.clienteId);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha eliminado el cliente' });
    } else {
        res.json({ error: 'No se ha eliminado el cliente' })
    }
    //res.json(result);
});




module.exports = router;