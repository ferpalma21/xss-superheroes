NEWSCHEMA('flags', function(schema) {
  schema.define('_id', 'UID');
  schema.define('flag', 'String(32)');
  schema.define('used', 'Boolean');
  schema.define('sent', 'Boolean');
});

setTimeout(()=>{
  let db = NOSQL('flags');
  db.find().where('used', false).callback((err,flags)=>{
    if (flags.length > 0) return
    for (var i = 0; i < 20; i++) {
      let flag = FAKE('flags')
      flag.used = false;
      flag.sent = false;
      db.insert(flag)
    }
  });
}, 1000)
