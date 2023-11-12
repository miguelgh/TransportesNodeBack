var pool = require('./bd');

async function getNovedades(){
    var query = "select * from novedades order by  id asc";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedades(obj){
    try{
        var query = "insert into novedades set ? ";
        //envío el obj que contiene los datos que se envían a la base de datos
        var rows = await pool.query(query, [obj]);
        return rows;
    }catch (error){
        console.log(error);
        throw error;
    }
}

//selecciona un fila en novedades por id, para luego en otra función modificarla
async function getNovedadById (id){
    var query = "select * from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}
//modifica una fila en base a un id
async function modificarNovedadById (obj, id){
    try{
        var query = "update novedades set ? where id = ? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        throw error;
    }
}
//Elimina una fila en base a su id
async function deleteNovedadById(id){
    var query = "delete from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getNovedades, insertNovedades, getNovedadById, modificarNovedadById, deleteNovedadById }