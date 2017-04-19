var util = require('util');
var {Router} = require('express');

// Our API for demos only
import {fakeDataBase} from './db';
import {fakeDemoRedisCache} from './cache';

// you would use cookies/token etc
var USER_ID = 'f9d98cf1-1b96-464e-8755-bcc2a5c09077'; // hardcoded as an example

// Our API for demos only
export function serverApi(req, res) {
  let key = USER_ID + '/data.json';
  let cache = fakeDemoRedisCache.get(key);
  if (cache !== undefined) {
    console.log('/data.json Cache Hit');
    return res.json(cache);
  }
  console.log('/data.json Cache Miss');

  fakeDataBase.get()
    .then(data => {
      fakeDemoRedisCache.set(key, data);
      return data;
    })
    .then(data => res.json(data));
}


// todo API

var COUNT = 4;

var TODOS = [
  { id: 0, value: 'finish example', created_at: new Date(), completed: false },
  { id: 1, value: 'add tests',      created_at: new Date(), completed: false },
  { id: 2, value: 'include development environment', created_at: new Date(), completed: false },
  { id: 3, value: 'include production environment',  created_at: new Date(), completed: false }
];

var HEROES = [
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'}
];

export function createHeroApi(){
  var router = Router()

  router.route('/heroes')
    .get(function (req,res) {
      console.log('GET');
      setTimeout(function () {
        res.json(HEROES);
      });
    })
    .post(function (req,res) {
      console.log('POST', util.inspect(req.body, {colors: true}));

      var hero = req.body;

      if (hero) {
        hero = {
          name : hero.name,
          id: COUNT++
        }

        HEROES.push(hero);

        return res.json(hero);
      }

      return res.end();
    });

  router.param('hero_id', function(req, res, next, hero_id) {
    // ensure correct prop type
    var id = Number(req.params.hero_id);
    try {
      var hero = HEROES.find(function (hero) {
        return hero.id === id;
      });

      req.hero_id = id;
      req.hero = hero;
      next();
    } catch (e) {
      next(new Error('failed to load hero'));
    }
  });

  router.route('/heroes/:hero_id')
    .get(function(req, res) {
      console.log('GET', util.inspect(req.hero, {colors: true}));

      res.json(req.hero);
    })
    .put(function(req, res) {
      console.log('PUT', util.inspect(req.body, {colors: true}));

      var index = HEROES.indexOf(req.hero);
      var hero = HEROES[index] = req.body;

      res.json(hero);
    })
    .delete(function(req, res) {
      console.log('DELETE', req.hero_id);

      var index = HEROES.indexOf(req.hero);
      HEROES.splice(index, 1);

      res.json(req.hero);
    });

  return router;
}

export function createTodoApi() {

  var router = Router()

  router.route('/todos')
    .get(function(req, res) {
      console.log('GET');
      // 70ms latency
      setTimeout(function() {
        res.json(TODOS);
      }, 0);

    })
    .post(function(req, res) {
      console.log('POST', util.inspect(req.body, {colors: true}));
      var todo = req.body;
      if (todo) {
        TODOS.push({
          value: todo.value,
          created_at: new Date(),
          completed: todo.completed,
          id: COUNT++
        });
        return res.json(todo);
      }

      return res.end();
    });

  router.param('todo_id', function(req, res, next, todo_id) {
    // ensure correct prop type
    var id = Number(req.params.todo_id);
    try {
      var todo = TODOS[id];
      req.todo_id = id;
      req.todo = TODOS[id];
      next();
    } catch (e) {
      next(new Error('failed to load todo'));
    }
  });

  router.route('/todos/:todo_id')
    .get(function(req, res) {
      console.log('GET', util.inspect(req.todo, {colors: true}));

      res.json(req.todo);
    })
    .put(function(req, res) {
      console.log('PUT', util.inspect(req.body, {colors: true}));

      var index = TODOS.indexOf(req.todo);
      var todo = TODOS[index] = req.body;

      res.json(todo);
    })
    .delete(function(req, res) {
      console.log('DELETE', req.todo_id);

      var index = TODOS.indexOf(req.todo);
      TODOS.splice(index, 1);

      res.json(req.todo);
    });

  return router;
};
