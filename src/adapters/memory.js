var memoryDb = {
  monkeys: [],

  loadMonkeys: function () {
    return Promise.resolve(this.monkeys);
  },

  saveMonkeys: function (monkeys) {
    this.monkeys = monkeys;
    return Promise.resolve();
  }
};

module.exports = {
  init: () => Promise.resolve(memoryDb)
};