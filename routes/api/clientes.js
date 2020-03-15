const router = require('express').Router();
const Cliente = require('../../models/cliente');
const { check, validationResult } = require('express-validator');


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
router.post('/create', [
        check('nombre').isLength({ min: 3 }),
        check('apellidos').isLength({ min: 3 }),
        check('direccion').isLength({ min: 3 }),
        check('email').isEmail(),
        check('edad').isNumeric(),
        check('sexo').isLength({ min: 1 }),
        check('cuota').isDecimal(),
        check('fecha_nacimiento'),
        check('dni').custom((value) => {
            return (/^[a-zA-Z0-9]{5,10}$/).test(value);
        })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        let result = await Cliente.create(req.body);
        res.json(result);
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