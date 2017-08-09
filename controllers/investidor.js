var ObjectID = require('mongodb').ObjectID;

// listar todos os investidores
exports.listarTodos = function (req, res) {
    req.db.collection('investidores').find().toArray(function(err, result) {
        if (err) {
          return console.log(err)
        };

        res.send(result);
    });
};

// listar uns dos investidores
exports.listarUm = function (req, res) {
    req.db.collection('investidores').findOne({_id: ObjectID(req.params.id)}).then(function(result) {
        res.send(result);
    });
};


//registrar investidor
exports.registrar = function (req, res){

  req.db.collection('investidores').save(req.body, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
    console.log('foi salvo')
    res.sendStatus(200);
  });
}

//apagar investidor
exports.deletar = function (req, res) {
  var id = req.params.id;

  req.db.collection('investidores').remove({_id: ObjectID(id)}, {justOne: true}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
    res.sendStatus(200);
  });
};
