
function arrayBufferToHex (buffer) {
  return Array
    .from (new Uint8Array (buffer))
    .map (b => b.toString (16).padStart (2, "0"))
    .join ("");
};

function hexToArrayBuffer (hex) {
  return typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h) {
    return parseInt(h, 16)
  }))
}

function arrayBufferToString(buf) {
  return new TextDecoder().decode(buf);
}
function stringToArrayBuffer(str) {
  return new TextEncoder().encode(str);
}

function arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

function base64ToArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

var cryptoUtils  = {
  generateKey: async function() {
    var key = await window.crypto.subtle.generateKey(
      {
        name: "AES-CTR",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );
    var keydata = await window.crypto.subtle.exportKey(
      "raw",
      key
    );

    var mnemonic = bip39.entropyToMnemonic(arrayBufferToHex(keydata));

    return {
      "key": key,
      "mnemonic": mnemonic
      }
  },

  importkey: async function(mnemonic) {
    keydata = bip39.mnemonicToEntropy(mnemonic).toString('hex');
    key = await window.crypto.subtle.importKey(
      "raw",
      hexToArrayBuffer(key)
      ,
      {
        name: "AES-CTR",
      },
      false,
      ["encrypt", "decrypt"]);

    return key;
  },

  encrypt: async function(key, dataString) {
    var dataEncrypted =  await window.crypto.subtle.encrypt(
      {
        name: "AES-CTR",
        counter: new Uint8Array(16),
        length: 128, //can be 1-128
      },
      key, //from generateKey or importKey above
      stringToArrayBuffer(dataString) //ArrayBuffer of data you want to encrypt
    );
    return arrayBufferToBase64(dataEncrypted);
  },

  decrypt: async function(key, base64String) {

    var dataDecrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-CTR",
        counter: ArrayBuffer(16),
        length: 128
      },
      key, //from generateKey or importKey above
      base64ToArrayBuffer(base64String) //ArrayBuffer of the data
    );
    return arrayBufferToHex(dataDecrypted);
  },

  sha256: async function(dataString) {
    var dataHash = await window.crypto.subtle.digest(
      {
        name: "SHA-256",
      },
      stringToArrayBuffer(dataString)
    );
    console.log(dataHash);
    return arrayBufferToHex(dataHash);
  }
};



