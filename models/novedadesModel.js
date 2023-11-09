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

module.exports = { getNovedades, insertNovedades }