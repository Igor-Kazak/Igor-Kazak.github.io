const express = require('express');
const app = express();
const bp = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use('/',express.static(__dirname+'/public'));

const db = knex({
  client: 'pg',
  connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '1',
      database: 'public'
  }
});

db.schema.hasTable('userlist').then(function(exists) {
  if (!exists) {
    return db.schema.createTable('userlist', function(table) {
      table.increments();
      table.string('username');
      table.string('password');
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.timestamps();
    });
  }
});

app.post('/login', function (req, res) {
  console.log('login attempt');
  db
    .select('password').from('userlist')
    .where('username', req.body.username)
    .then(data => {
      if (data.length > 0) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          db
            .select('firstname', 'lastname').from('userlist')
            .where('username', req.body.username)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              console.log(err.message)
            });
          console.log('login ok: '  + req.body.username);
        }
        else {
          console.log('password incorrect for: ' + req.body.username);
          res.send([]);
        }
      }
      else {
        console.log('no user found: ' + req.body.username);
        res.send(data);
      }
    })
    .catch(err => {
      console.log(err.message)
    });

});

app.post('/register', function (req, res) {
  console.log('register attempt');
  db
    .select('username').from('userlist')
    .where('username', req.body.username)
    .then(data => {
      if (data.length == 0) {
        let hash = bcrypt.hashSync(req.body.password, salt)
        let newuser = {
          username: req.body.username,
          password: hash,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          email: req.body.email,
        }
        db('userlist')
          .returning('*')
          .insert(newuser)
          .then(data => {
            console.log(data);
            res.send({ "message": "User was registered!" })
          })
          .catch(err => {
            console.log(err.message)
          });
      }
      else {
        res.send({ "message": "User already registered!" });
        console.log('user already registered: '  + req.body.username);
      }
    })
    .catch(err => {
      console.log(err.message)
    });
});

app.listen(3000, () => {
  console.log('listening port 3000')
});
