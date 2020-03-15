const router = require('express').Router();
const Profesor = require('../../models/profesor');


//GET http://localhost:3000/api/profesores/getall
router.get('/', async(req, res) => {
    const profesor = await Profesor.getAll();
    res.json(profesor);
});



//GET http://localhost:3000/api/profesores/id
router.get('/:profesorId', async(req, res) => {
    const result = await Profesor.getById(req.params.profesorId);
    res.json(result);
});


//POST http://localhost:3000/api/profesores/create
router.post('/create', async(req, res) => {
    const result = await Profesor.create(req.body);
    re4s.json(result);
});



//PUT http://localhost:3000/api/profesores/update
router.put('/update', async(req, res) => {
    const result = await Profesor.update(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'El profesor se ha actualizado' });
    } else {
        res.json({ error: "El profesor no se ha actualizado" });
    }
});


//DELETE http://localhost:3000/api/profesores/delete
router.delete('/delete', async(req, res) => {
    const result = await Profesor.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha eliminado el profesor' });
    } else {
        res.json({ error: 'No se ha eliminado el profesor' })
    }
})




module.exports = router;