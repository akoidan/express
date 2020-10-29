const {checkPassword, generateKey} = require("./utils");

const db = require('./db');

module.exports.performLogin = async function (req, resp) {
  let users = await db.findUserByLogin(req.body.login);
  if (!users.length) {
    resp.status(400).send("Login doesn't exist");
    return;
  }
  let user = users[0];
  let passwordValid = await checkPassword(req.body.password, user.password);
  if (!passwordValid) {
    resp.status(400).send("Invalid password");
    return
  }
  let sessionId = generateKey();
  await db.updateSessionId(user._id, sessionId);
  resp.json({session_id: sessionId});
}