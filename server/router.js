const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/getProfile', mid.requiresLogin, controllers.Profile.getProfile);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/profile', mid.requiresLogin, controllers.Profile.profilePage);
  app.post('/makeProfile', mid.requiresLogin, controllers.Profile.makeProfile);
  app.get('/editProfile', mid.requiresLogin, controllers.Profile.editProfilePage);
  app.patch('/editProfile', mid.requiresLogin, controllers.Profile.editProfile);

  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
