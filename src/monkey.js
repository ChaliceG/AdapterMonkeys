var db = require('./adapters/database');

var Monkey = function (name, hunger) {
  if (!name) {
    name = randomName();
  }

  if (isNaN(hunger)) {
    hunger = 0;
  }

  this.name = name;
  this.hunger = hunger;
  this.dead = false;
};

var names = [
  'Brock',
  'Hank',
  'Dean',
  'Rusty',
  'Billie',
  'White',
  'Hunter',
  'Gathers',
  'Mankey',
  'David',
  'Jefferson',
  'Orpheus',
  'Gary'
];

function randomName () {
  return names[getRandomInt(0, names.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Monkey.prototype.changeHunger = function (delta) {
  this.hunger += delta;

  if (this.hunger > 1) {
    this.dead = true;
  }
};

Monkey.prototype.eatBanana = function () {
  this.changeHunger(-2);
};

Monkey.prototype.climbTree = function () {
  this.changeHunger(1);
};

Monkey.prototype.monkeyBusiness = function () {
  this.changeHunger(1);

  var action = getRandomInt(1, 5);
  var i = 0;
  var newMonkeys = [];

  for(; i < action; i++) {
    newMonkeys.push(new Monkey());
  }

  return newMonkeys;
};

Monkey.prototype.monkeyAround = function () {
  var actions = [
    'climbTree',
    'climbTree',
    'climbTree',
    'climbTree',
    'eatBanana',
    'monkeyBusiness'
  ];

  var action = actions[getRandomInt(0, actions.length)];

  return this[action]();
};

Monkey.Load = function () {
  return db.loadMonkeys()
    .then(monkeys => {
      var monkeyObjects = [];
      monkeys.forEach(monkey => {
        monkeyObjects.push(new Monkey(monkey.name, monkey.hunger));
      });
      return Promise.resolve(monkeyObjects);
    });
};

Monkey.Save = function (monkeys) {
  var aliveMonkeys = [];

  monkeys.forEach(monkey => {
    if (!monkey.dead) {
      aliveMonkeys.push(monkey);
    }
  });

  return db.saveMonkeys(aliveMonkeys);
};

module.exports = Monkey;