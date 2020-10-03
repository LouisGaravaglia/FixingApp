Bug #1 // Missing logic to valid JWT and validate against a JSON schema (which is missing) for posting a new user. Also, needed to import expressError into user.js in order to use for post route.
Bug #2 // In the "/login" route within the "auth.js" file, await was missing on the User.register line so it was causing the token to be returned and preventing the error message to be displayed, even if the password or username is incorrect.

Bug #7 // "module.exports = app" was listed twice at the bottom of app.py