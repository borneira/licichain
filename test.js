let data = 'QkldRVZeDh8KbmJ0YGVrYmdoDENLXEATbBkV';
let buff = new Buffer(data, 'base64');
let buffaux = new Buffer(27);

const numbers12 = ['','1','2'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

let i ='';
let j ='';
let k ='';

for (let i of numbers12) {
  for (let j of numbers) {
    for (let k of numbers) {
      let kk = '' + i + j + k +'.';
      let tmpbuff = new Buffer(kk, 'ascii');
      var p;
      for (p = 0; p < buff.length; p++) {
        buffaux[p] = buff[p] ^ tmpbuff[p % tmpbuff.length];
      }
      console.log(i+j+k);
      console.log(buffaux.toString('ascii'));
    }
  }
}
