//guarda en la variable pool el acceso a la base de datos creada en models
var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password){
    try{
        //query hace la consulta a la base de datos
        var query = "select * from usuarios where usuario = ? and password = ? limit 1";
        //la fila lleva los datos de usuario y password 
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    }catch(error) {
        throw error;
    }
}

module.exports = { getUserByUsernameAndPassword }