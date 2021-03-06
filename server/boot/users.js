module.exports = function(app) {
  var User = app.models.usuario;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  User.count(function(err, count) {
    if (err) throw err;
    if (count == 0) {
      console.log('Creando usuarios de test');

      User.create([
        {
          username: 'borneira',
          email: 'juan@borneira.com',
          password: 'Passw0rd',
          descripcion: 'Borneira, S.A.',
          tipo: 'EMPRESA',
        },
        {
          username: 'acme',
          email: 'adm@acme.com',
          password: 'Passw0rd',
          descripcion: 'ACME, S.A.',
          tipo: 'EMPRESA',
        },
        {
          username: 'contoso',
          email: 'adm@contoso.com',
          password: 'Passw0rd',
          descripcion: 'Contoso, S.A.',
          tipo: 'EMPRESA',
        },
        {
          username: 'aytovigo',
          email: 'contratacion@aytovigo.es',
          password: 'Passw0rd',
          descripcion: 'Ayuntamiento de Vigo',
          tipo: 'AAPP'
        },
      ], function(err, users) {
        if (err) throw err;

        console.log('Created users:', users);

        Role.create({
          name: 'AAPP',
        }, function(err, role) {
          if (err) throw err;

          console.log('Created role:', role);

          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[3].id,
          }, function(err, principal) {
            if (err) throw err;

            console.log('Created principal:', principal);
          });
        });
        Role.create({
          name: 'EMPRESA',
        }, function(err, role) {
          if (err) throw err;

          console.log('Created role:', role);

          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id,
          }, function(err, principal) {
            if (err) throw err;
            console.log('Created principal:', principal);
          });
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[1].id,
          }, function(err, principal) {
            if (err) throw err;
            console.log('Created principal:', principal);
          });
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[2].id,
          }, function(err, principal) {
            if (err) throw err;
            console.log('Created principal:', principal);
          });
        });
      });
    }
  });
};
