var express        = require('express'),
    bodyParser     = require('body-parser'),
    expressMongoDb = require('express-mongo-db');

var InvestidorControllers = require('./controllers/investidor.js');


// inicializa o express
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/astraData'));

// libera acesso à API de qualquer host/cliente
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// inicializa o servidor na porta especificada
app.listen(3000, function() {
  console.log('Acesse o servidor http://localhost:3000');
});

// Endpoints

// investidor
app.post('/cadastrar-investidor', InvestidorControllers.registrar);
app.get('/recuperar-investidores', InvestidorControllers.listarTodos);
app.get('/recuperar-investidor/:id', InvestidorControllers.listarUm);
app.post('/deletar-investidor/:id', InvestidorControllers.deletar);
