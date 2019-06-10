const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  // si esta autentificado continua en caso contrario ira a la página de registro
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    req.flash('error_msg', 'Not Authorized.');
    res.redirect('/users/signin');
  }
};

module.exports = helpers;
