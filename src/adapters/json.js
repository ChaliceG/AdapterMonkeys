var fs = require('fs');
var Bluebird = require('bluebird');
var readFile = Bluebird.promisify(fs.readFile);
var writeFile = Bluebird.promisify(fs.writeFile);

var file = './jungle.json';

var jsonDb = {

  loadMonkeys: function () {
    return readFile(file)
      .then(data => {
        return JSON.parse(data);
      });
  },

  saveMonkeys: function (monkeys) {
    return wait2()
      .then(() => writeFile(file, JSON.stringify(monkeys)));
  }
};

var wait2 = function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 2000);
  });
};

module.exports = {
  init: () => Promise.resolve(jsonDb)
};