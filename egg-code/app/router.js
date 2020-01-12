'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);

  router.get('/list', controller.user.list);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);

  router.get('/getdoclist', controller.doc.getdoclist);
  router.post('/del', controller.doc.del);
  router.post('/add', controller.doc.add);

  router.get('/getkindlist', controller.kind.getkindlist);
  router.delete('/del/kind', controller.kind.del);
  router.put('/edit/kind', controller.kind.edit);
  router.post('/add/kind', controller.kind.add);
};
