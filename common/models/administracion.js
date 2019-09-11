'use strict';

module.exports = function(Administracion) {

  Administracion.disableRemoteMethodByName('replaceOrCreate');
  Administracion.disableRemoteMethodByName('patchOrCreate(');
  Administracion.disableRemoteMethodByName('exists');
  Administracion.disableRemoteMethodByName('findOne');
  Administracion.disableRemoteMethodByName('count');
  Administracion.disableRemoteMethodByName('replaceById');
  Administracion.disableRemoteMethodByName('prototype.patchAttributes');
  Administracion.disableRemoteMethodByName('createChangeStream');
  Administracion.disableRemoteMethodByName('updateAll');
  Administracion.disableRemoteMethodByName('replaceOrCreate');
  Administracion.disableRemoteMethodByName('replaceById');
  Administracion.disableRemoteMethodByName('deleteById');
  Administracion.disableRemoteMethodByName('upsertWithWhere');
  Administracion.disableRemoteMethodByName('protoype.__create__licitaciones');
  Administracion.disableRemoteMethodByName('protoype.__update__licitaciones');
  Administracion.disableRemoteMethodByName('protoype.__destroy__licitaciones');
  Administracion.disableRemoteMethodByName('prototype.__updateById__licitaciones');
  Administracion.disableRemoteMethodByName('protoype.__create__usuarios');
  Administracion.disableRemoteMethodByName('protoype.__update__usuarios');
  Administracion.disableRemoteMethodByName('protoype.__destroy__usuarios');
  Administracion.disableRemoteMethodByName('prototype.__updateById__usuarios');
};
