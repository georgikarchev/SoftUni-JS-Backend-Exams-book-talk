// const jwt = require("../utils/jwt");
const jwt = require('jsonwebtoken');

const { AUTH_COOKIE_NAME, JTW_SECRET } = require("../constants");

// TODO all functions which get info whether a user is logged in or not based on the token
// this information will be used to personalize the page/ authorize the user and display adequate menu elements

exports.auth = function (req, res, next) {
  let token = req.cookies[AUTH_COOKIE_NAME];
  
  if(token) {
    jwt.verify(token, JTW_SECRET, function (err, decoded) {
      if(err) {
        res.status(404).render('404');
      }
      
      req.user = decoded;
      res.locals.user = decoded; // give hbs access to user data
      next();
    });
  } else {
    next();
  }
};

exports.isAuth = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/login'); // should I use return?
  }
};

exports.isGuest = function (req, res, next) {
  if(!req.user) {
    next();
  } else {
    res.redirect('/');
  }
};
