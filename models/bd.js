//carga la dependencia mysql y util que se instalaron por npm
var mysql = require('mysql');
var util = require('util');

/*crea la conexión en la variable pool con los datos de la variable
de entorno .env, donde están guardados todos los datos de conexión
por eso se utiliza process.env...
*/
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DB_NAME
});

pool.query = util.promisify(pool.query);
//se exporta la variable pool para poder hacer conexiones a la base donde se necesite
module.exports = pool;