var chaiAsPromised = require('chai-as-promised');
var chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

var dbAdapter = require('../src/adapters/database');
var mockDatabase = require('./mockDatabase');

it('is a harness', function (done) {
  dbAdapter.init({
    init: () => Promise.resolve(mockDatabase)
  }).then(() => {
    done();
  });
});