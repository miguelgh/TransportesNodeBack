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

//para agregar un nuevo contenido y pasar a otra página al recibir /agregar
router.get('/agregar', (req, res, next)=> {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

//inserta una nueva fila en al base de datos presionando "guardar"
router.post('/agregar', async (req, res, next)=> {
  try{
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedades(req.body);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
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

//seleccionamos una fila por id para poder modificarla
router.get('/modificar/:id', async (req, res, next)=>{
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar',{
    layout: 'admin/layout',
    novedad
  });
});
//modificamos la novedad al hacer clic en "guardar"
router.post('/modificar', async (req, res, next)=>{
  try{
    let obj ={
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  }catch(error){
    console.log(error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  }
});

//elimina una fila por id
router.get('/eliminar/:id', async (req, res, next)=> {
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

module.exports = router;