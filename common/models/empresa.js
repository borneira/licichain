'use strict';

module.exports = function(Empresa) {

  Empresa.disableRemoteMethodByName('replaceOrCreate');
  Empresa.disableRemoteMethodByName('patchOrCreate(');
  Empresa.disableRemoteMethodByName('exists');
  Empresa.disableRemoteMethodByName('findOne');
  Empresa.disableRemoteMethodByName('count');
  Empresa.disableRemoteMethodByName('replaceById');
  Empresa.disableRemoteMethodByName('prototype.patchAttributes');
  Empresa.disableRemoteMethodByName('createChangeStream');
  Empresa.disableRemoteMethodByName('updateAll');
  Empresa.disableRemoteMethodByName('replaceOrCreate');
  Empresa.disableRemoteMethodByName('replaceById');
  Empresa.disableRemoteMethodByName('deleteById');
  Empresa.disableRemoteMethodByName('upsertWithWhere');
  Empresa.disableRemoteMethodByName('protoype.__create__ofertas');
  Empresa.disableRemoteMethodByName('protoype.__update__ofertas');
  Empresa.disableRemoteMethodByName('protoype.__destroy__ofertas');
  Empresa.disableRemoteMethodByName('prototype.__updateById__ofertas');
  Empresa.disableRemoteMethodByName('protoype.__create__usuarios');
  Empresa.disableRemoteMethodByName('protoype.__update__usuarios');
  Empresa.disableRemoteMethodByName('protoype.__destroy__usuarios');
  Empresa.disableRemoteMethodByName('prototype.__updateById__usuarios');
};
