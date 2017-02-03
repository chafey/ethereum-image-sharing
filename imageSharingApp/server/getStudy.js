import { HTTP } from 'meteor/http'
import eutil from 'ethereumjs-util';
import keyPair from './keyPair.js';

export default function(url, keyPair) {

  var contractAddress = "0x1345adb7a96799980eb3bb73e729ae12d0d8edfb";

  var msSinceEpoch = new Date().getTime();

  var hash = eutil.sha256(contractAddress + msSinceEpoch);

  var sig = eutil.ecsign(hash, Buffer.from(keyPair.privateKey.substr(2), 'hex'));

  //console.log('sig:', sig);

  HTTP.call('GET', url, {
    headers: {
      "x-secp256k1-r" : sig.r.toString('hex'),
      "x-secp256k1-s" : sig.s.toString('hex'),
      "x-secp256k1-v" : sig.v,
      "x-timestamp" : msSinceEpoch,
      "x-contractaddress" : contractAddress
    }
  }, function(err, resp) {

  });

}
