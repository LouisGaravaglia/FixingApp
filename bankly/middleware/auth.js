/** Middleware for handling req authorization for routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require("../helpers/expressError");

/** Authorization Middleware: Requires user is logged in. */

function requireLogin(req, res, next) {
  try {
    if (req.curr_username) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authorization Middleware: Requires user is logged in and is staff. */

function requireAdmin(req, res, next) {
  try {
    if (req.curr_admin) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

function authUser(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    // FIXES BUG #3 (Verifying JWT to make sure the SECRET_KEY hasn't been changed and valid before proceeding)
    let token = jwt.verify(tokenStr, SECRET_KEY);
    if (token) {
      req.curr_username = token.username;
      req.curr_admin = token.admin;
    }
    // BUG CODE:
    // const token = req.body._token || req.query._token;
    // if (token) {
    //   let payload = jwt.decode(token);
    //   req.curr_username = payload.username;
    //   req.curr_admin = payload.admin;
    // }
    return next()
  } catch (err) {
    return next(new ExpressError("You must authenticate first", 401));
  }
} // end

module.exports = {
  requireLogin,
  requireAdmin,
  authUser
};
