/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');
const { validate } = require("jsonschema");
const newUserSchema = require("../userSchema.json");
const ExpressError = require("../helpers/expressError");


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async function(req, res, next) {
  try {
    // FIXES BUG #1 (Added validation agains a JSONschema to make sure all usesr properties have been submitted)
    const results = validate(req.body, newUserSchema);
    if (!results.valid) {
      throw new ExpressError(results.errors.map(e=>e.stack), 400);
    }
    let user = await User.register(req.body);
    const token = createTokenForUser(req.body.username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); 

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    // FIXES BUG #2 (Added the await keyword in front of calling the User method authenicate())
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); 

module.exports = router;
