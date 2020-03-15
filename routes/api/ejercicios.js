const router = require('express').Router();
const Ejercicio = require('../../models/ejercicio');


//GET http://localhost:3000/api/ejercicios/getall
router.get('/getall', async(req, res) => {
    const rows = await Ejercicio.getAll();
    res.json(rows);
})


//GET http://localhost:3000/api/ejercicios/23
router.get('/:ejercicioId', async(req, res) => {
    const result = await Ejercicio.getById(req.params.ejercicioId);
    res.json(result);
})


//POST http://localhost:3000/api/ejercicios/create
router.post('/create', async(req, res) => {
    const result = await Ejercicio.create(req.body);
    res.json(result);
});



//PUT http://localhost:3000/api/ejercicios/update
router.put('/update', async(req, res) => {
    const result = await Ejercicio.update(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'El ejercicio se ha actualizado' });
    } else {
        res.json({ error: "El ejercicio no se ha actualizado" });
    }
});



//DELETE http://localhost:3000/api/ejercicios/delete
router.delete('/delete', async(req, res) => {
    const result = await Ejercicio.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha eliminado el ejercicio' });
    } else {
        res.json({ error: 'No se ha eliminado el ejercicio' })
    }
});




module.exports = router;