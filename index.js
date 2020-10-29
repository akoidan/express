const {performLogin }= require('./controller');
const Joi = require('joi');
const app = require('./app');
const {validate, login} = require('./utils');
const db = require('./db');

const injectUser = login(db.getUserBySessionId);


app.post('/api/login', validate( performLogin, {
  password: Joi.string().required(),
  login: Joi.string().required()
}));

