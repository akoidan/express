var pmongo = require('promised-mongo');
const db = pmongo('severbat', ['users']);


module.exports.getUserBySessionId = async function(session_id) {
  return await db.users.find({session_id})
};

module.exports.findUserByLogin = async function(login) {
  return await db.users.find({login})
};

module.exports.updateSessionId = async function(_id, session_id) {
  return await db.users.update({_id}, { $set: { session_id } })
};