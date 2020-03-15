const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    })
};



const getById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('select*from clientes where id = ?', [pClienteId], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) { //esto es, si la query no me devuelve nada, porque no hay registros, devuelveme un null
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
}




const create = ({ nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, profesor }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into clientes (nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion,cuota, fecha_nacimiento, dni, fk_profesor) values (?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, edad, sexo, new Date(), cuota, fecha_nacimiento, dni, profesor]),
            (err, result) => {

                if (err) reject(err);
                resolve(result);
            }
    });
}




const update = ({ nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, profesor, id }) => {
    return new Promise((resolve, reject) => {
        db.query('update clientes set nombre=?, apellidos=?, direccion=?, email=?, edad=?, sexo=?, fecha_inscripcion=?,cuota=?, fecha_nacimiento=?, dni=?, fk_profesor=? where id=? ', [nombre, apellidos, direccion, email, edad, sexo, new Date(), cuota, fecha_nacimiento, dni, profesor, id]),
            (err, result) => {
                console.log(err)
                if (err) reject(err);
                resolve(result);
            }
    });
}




const deleteById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from clientes where id = ?', [pClienteId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}




module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    deleteById: deleteById,

}