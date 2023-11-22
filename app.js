var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require ('express-fileupload');

//se agrega la dependencia de dotenv para la conexión con la base de datos
require('dotenv').config();
//se habilitan las sesiones
var session = require('express-session');


//ruteos controladores
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//este va a ser la sección del login donde uno puede administrar la página de novedades
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload({
  useTempFiles:true,
  tempFileDir: '/tmp/'
}));

app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

//se genera la función de sesiones para delimitar el acceso

secure = async (req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario){
      //si el usuario es correcto continuo
      next();
    }else{
      //si no lo recibo, lo redirijo al login
      res.redirect('/admin/login');
    }
  }catch (error){
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
//acá uso el login, cuando se escriba "/admin/login" va a llamar al controlador creado mas arriba
//'var loginRouter' que a su ves redirecciona a los routers con su carpeta admin/login
app.use('/admin/login', loginRouter);
//con secure, lo que hace es chequear que el id del usuario esté ok, si es así permite el render de novedades
app.use('/admin/novedades', secure, adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
