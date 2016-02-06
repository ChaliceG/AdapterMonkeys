var Jungle = require('./src/jungle');
var db = require('./src/adapters/database');
var memoryDb = require('./src/adapters/memory');
var jsonDb = require('./src/adapters/json');

db.init(memoryDb)
  .then(() => {

    var jungle = new Jungle();

    jungle.save()
      .then(() => {
        return iteration(jungle, 1);
      }).then(() => {
        return iteration(jungle, 2);
      }).then(() => {
        return iteration(jungle, 3);
      }).then(() => {
        return iteration(jungle, 4);
      }).then(() => {
        return iteration(jungle, 5);
      });
  });


function iteration (jungle, iteration) {
  return jungle.load()
    .then(() => {
      jungle.action();

      console.log(`----after action ${iteration}-----`);
      console.log(`----after action ${iteration}-----`);
      console.log(`----after action ${iteration}-----`);
      console.log(jungle.monkeys);

      return jungle.save();
    });
}