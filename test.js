var assert = require('assert');

const {performLogin} = require('./controller');
const {generatePassword, checkPassword} = require('./utils');

describe('login', function () {
  it('should validate password', async () => {
    let hash = await generatePassword("123asd123");
    let checkPasswor = await checkPassword("123asd123", hash);
    assert.equal(checkPasswor, true);
  });
  it('should login', async function( )  {
    await performLogin({body: {
        login: "andrew",
        password: "123asd123"
      }}, {
      json: function (res) {
        assert(res.session_id.length, 64);
      }
    })
  });
});