var db = {
  init: implementation => {
    return implementation.init()
      .then(injectedDb => {
        db.loadMonkeys = injectedDb.loadMonkeys;
        db.saveMonkeys = injectedDb.saveMonkeys;
        return Promise.resolve();
      });
  }
};

module.exports = db;