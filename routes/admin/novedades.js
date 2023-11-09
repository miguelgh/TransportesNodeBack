var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

router.get('/',async function(req, res, next) {
  //guarda los datos que trae de la base de datos
  var novedades = await novedadesModel.getNovedades();
  res.render('admin/novedades', { //admin/novedades.hbs
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades//se envía novedades que está en la base de datos, al hbs
    });
});

//para agregar un nuevo contenido, al recibir /agregar
router.get('/agregar', (req, res, next)=> {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next)=> {
  try{
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedades(req.body);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'todos los campos son requeridos'
      })
    }
  }catch(error){
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, 
      message: 'no se cargó la novedad'
    })
  }
});

module.exports = router;