'use strict';

module.exports = function(Licitacion) {
  Licitacion.observe('before save', function(ctx, next) {
    console.log(ctx);

    const path = require('path');
    const fs = require('fs');
    const solc = require('solc');
    const myContractPath = path.resolve(__dirname, '../../' + 'contracts', 'helloworld.sol');
    console.log(myContractPath);
    const sourceCode = fs.readFileSync(myContractPath, 'utf8');
    var input = {
      language: 'Solidity',
      sources: {
        'helloworld.sol' : {
          content: sourceCode
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': [ '*' ]
          }
        }
      }
    };
    console.log(JSON.parse(solc.compile(JSON.stringify(input))));
    return next();
  });
};
