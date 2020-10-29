var crypto = require('crypto');
const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports.generateKey = function () {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};


module.exports.generatePassword = async function (password) {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        rej(err)
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            rej(err)
          } else {
            res(hash)
          }
        })
      }

    });
  });
};

module.exports.checkPassword = async function(password, hash) {
  return new Promise((resolve, rej) => {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) {
        rej(err)
      } else {
        resolve(res)
      }
    });
  });
}

module.exports.login = function (getUserBySessionId) {
  return function (next) {
    return async (req, resp) => {
      if (!req.headers.session_id) {
        resp.status(401).send("session_id is missing");
      } else {
        let user = await getUserBySessionId(req.headers.session_id);
        if (!user.length) {
          resp.status(401).send("Invalid session_id");
        } else {
          req.user = user[0];
          await next(req, resp);
        }
      }
    }
  };
};

module.exports.validate = function (next, schema) {
  return async (req, resp) => {
    try {
      if (schema) {
        const {error} = Joi.validate(req.body, schema);
        if (error) {
          resp.status(400).send(error);
        }
      }
      await next(req, resp);
    } catch (e) {
      console.error(e);
      resp.status(500).send("Server error");
    }
  }
};