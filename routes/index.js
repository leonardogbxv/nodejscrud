var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  global.db.findAll((e, docs) => {
    if(e) { 
      return console.log(e);
    }
    res.render('index', {title: "Lista de Clientes", docs: docs });
  });
});

/* GET new */
router.get('/new', (req, res, next) => {
  res.render('new', { title: "Novo Cadastro", doc: {"nome": "", "idade": ""}, action: '/new' });
});

/* POST new */
router.post('/new', (req, res) => {
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  global.db.insertOne({nome, idade}, (err, result) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

/* GET edit */
router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  global.db.findOne(id, (e, docs) => {
    if(e) {
      return console.log(e);
    }
    res.render('new', { title: "Edição de Cliente", doc: docs[0], action: "/edit/" + docs[0]._id });
  });
});

/* POST edit */
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
    if(e) {
      return console.log(e);
    }
    res.redirect('/');
  });
});

/* GET/DELETE */
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
    if(e) {
      return console.log(e);
    }
    res.redirect('/');
  });
});

module.exports = router;
