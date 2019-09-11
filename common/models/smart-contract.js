'use strict';

module.exports = function(Smartcontract) {

  Smartcontract.disableRemoteMethodByName('replaceOrCreate');
  Smartcontract.disableRemoteMethodByName('patchOrCreate(');
  Smartcontract.disableRemoteMethodByName('exists');
  Smartcontract.disableRemoteMethodByName('findOne');
  Smartcontract.disableRemoteMethodByName('count');
  Smartcontract.disableRemoteMethodByName('replaceById');
  Smartcontract.disableRemoteMethodByName('prototype.patchAttributes');
  Smartcontract.disableRemoteMethodByName('createChangeStream');
  Smartcontract.disableRemoteMethodByName('updateAll');
  Smartcontract.disableRemoteMethodByName('replaceOrCreate');
  Smartcontract.disableRemoteMethodByName('replaceById');
  Smartcontract.disableRemoteMethodByName('deleteById');
  Smartcontract.disableRemoteMethodByName('upsertWithWhere');

};
