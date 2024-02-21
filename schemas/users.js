NEWSCHEMA('Users', function(schema){
  schema.define('_id', 'UID');
  schema.define('email', 'Email');
  schema.define('username', 'safestring', true);
  schema.define('password', 'safestring', true);

  schema.addWorkflow('login', ($) => {
    let db = NOSQL('users').one();
    db.where('username', $.body.username)
    db.where('password', $.body.password.sha512()).callback((err, user) => {
      if (err) return $.invalid();
      if (!user) return $.invalid('username or password are invlid');
      MAIN.session.authcookie($, UID(), user._id, '3 days');
      $.audit(user._id + ': ' + user.username + ' ' + user.email);
      $.success({redirect: '/'});
    })
  });

  schema.addWorkflow('sign-up', ($) => {
    let model = $.model;
    model.password = model.password.sha512();
    let db = NOSQL('users')
    db.find().where('email', $?.body?.email).callback((err,res) => {
      if (err) return $.invalid();
      if (res.length > 0) return $.invalid('El email o username ya fue usado');
      db.find().where('username', $?.body?.username).callback((err, res) => {
        if (err) return $.invalid();
        if (res.length > 0) return $.invalid('El email o username ya fue usado');
        model._id = UID()
        db.insert(model);
        return $.success({msg: 'Ahora puedes acceder'});
      })
    });
  });

  schema.addWorkflow('logout', ($) => {
    MAIN.session.logout($);
		$.cookie(CONF.cookie, '', '-1 year');
		$.redirect('/');
  })
});
