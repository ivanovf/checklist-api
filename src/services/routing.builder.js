const express = require('express');
const cors = require('cors');
const EntityManager = require('./entity.manager');
const validatorHandler = require('./../middlewares/validator.handler');
const authenticatorManager = require('./auth.manager');


const routingBuilder = function(app, routes, roles, config) {
  
  const appRoutes = routes;
  const router = express.Router();
  app.use(express.json());
  app.use(cors());

  const entityManager = new EntityManager();
  const authManager = new authenticatorManager(config.secret);

  routes.forEach((route, i) => {
    if (route.id == 'base') {
      app.use(route.path, router);
    }
    else if(route.id == 'login') {
      const loginSchema = require(route.dataValidator);
      router.post('/login',
        validatorHandler(loginSchema, 'body'),
        authManager.hasPermissions('POST', route.methods),
        async (req, res, next) => {
          try {
            const token = await authManager.getAuth(req.body.username, req.body.password);
            if (token) {
              res.status(200).json({token: token});
            }
            else {
              res.status(403).json({message: 'Not an user.'});
            }
          }
          catch (error) {
            next(error);
          }
        }
      );

      app.use(route.path, router);
    }
    else if(route.id == 'logout') {
      router.get('/logout',
        async (req, res, next) => {
          try {
            await authManager.logOut();
            res.status(200).json({message: 'User unlogged.'});
          }
          catch (error) {
            next(error);
          }
        }
      );

      app.use(route.path, router);
    }
    else {
      appRoutes[i].router = express.Router();
      const entity = entityManager.getStorage(route.entity);

      appRoutes[i].router.get('/', 
        authManager.validateToken(),
        authManager.hasPermissions('GET', route.methods),
        async (req, res, next) => {
          try {
            const items = await entity.find();
            res.status(200).json(items);
          }
          catch (error) {
            next(error);
          }
        }
      );

      const { createSchema, updateSchema, getSchema } = require(route.dataValidator);

      appRoutes[i].router.get('/:id',
        validatorHandler(getSchema, 'params'),
        authManager.hasPermissions('GET', route.methods),
        async (req, res, next) => {
          try {
            const { id } = req.params;
            const result = await entity.findOne(id);
            res.json(result);
          }
          catch (error) {
            next(error);
          }
        }
      );

      appRoutes[i].router.post('/',
        validatorHandler(createSchema, 'body'),	
        authManager.hasPermissions('POST', route.methods),
        async (req, res, next) => {
          try {
            const body = req.body;
            const newEntity = await entity.create(body);
            res.status(201).json(newEntity);
          }
          catch (error) {
            next(error);
          }
        }
      );

      appRoutes[i].router.patch('/:id',
        validatorHandler(getSchema, 'params'),
        validatorHandler(updateSchema, 'body'),
        authManager.hasPermissions('PATCH', route.methods),
        async (req, res, next) => {
          try {
            const { id } = req.params;
            const body = req.body;
            const updated = await entity.update(id, body);
            res.json(updated);
          } catch (error) {
            next(error);
          }
        }
      );

      appRoutes[i].router.delete('/:id',
        validatorHandler(getSchema, 'params'),
        authManager.hasPermissions('DELETE', route.methods),
        async (req, res, next) => {
          try {
            const { id } = req.params;
            await entity.delete(id);
            res.status(201).json({id});
          } catch (error) {
            next(error);
          }
        }
      );

      router.use(route.path, appRoutes[i].router);
    }
  });

}

module.exports = routingBuilder;