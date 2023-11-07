var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuarioModel');


router.get('/', function(req, res, next) {
  res.render('admin/login', { //admin/login.hbs
        layout: 'admin/layout',
    });
});

router.get('/logout', function(req, res, next){
  //si recibe /logout destruye la sesión y lo devuelve al login
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  })
});

router.post('/', async (req, res, next) => {
  try{
    //capturamos los datos del formulario del "login.hbs" con name usuario y password
    var usuario = req.body.usuario;
    var password = req.body.password;

    //Le mando el usuario y el password a la función creada en "usuarioModel.js"
    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if(data != undefined){
      //si en data tengo un registro, por coincidencia en la base de datos, entonces...

      //guardo en las variables de sesión, el id que viene de data y el usuario
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/novedades');
    }else{
      //si no entonces, hace un render del login, con el layout y envía el error
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }

  }catch (error){
    console.log(error);
  }
});

module.exports = router;
