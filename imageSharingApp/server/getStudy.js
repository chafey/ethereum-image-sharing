import { HTTP } from 'meteor/http'
import eutil from 'ethereumjs-util';
import keyPair from './keyPair.js';

function sigToHex(signature) {
  return '0x' + signature.r.toString('hex') + signature.s.toString('hex') + signature.v.toString(16);
}


export default function(url, keyPair) {

  var msSinceEpoch = new Date().getTime();

  var hash = eutil.sha256(url + ":" + msSinceEpoch);

  var sig = eutil.ecsign(hash, Buffer.from(keyPair.privateKey.substr(2), 'hex'));

  //console.log('sig:', sig);

  var sigHex = sigToHex(sig);

  //console.log('sig', sigHex);

  HTTP.call('GET', url, {
    headers: {
      "x-signature" : sigHex,
      "x-timestamp" : msSinceEpoch,
      "x-resource-url" : url,
      "x-contractaddress" : "0x1345adb7a96799980eb3bb73e729ae12d0d8edfb"
    }
  }, function(err, resp) {

  });

}
