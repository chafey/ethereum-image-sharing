import { Meteor } from 'meteor/meteor';

import studyShare from './studyShare';

/*
import keythereum from 'keythereum';
import eutil from 'ethereumjs-util';
import keyPair from './keyPair.js';
import web3 from './web3.js';

var dk = keythereum.create();
console.log('privateKey:', eutil.bufferToHex(dk.privateKey));
console.log('iv:', eutil.bufferToHex(dk.iv));
console.log('salt:', eutil.bufferToHex(dk.salt));
var hash = eutil.sha256("TestData");
var sig = eutil.ecsign(hash, dk.privateKey);
console.log('signature=', sig);
var pubKey = eutil.ecrecover(hash, sig.v, sig.r, sig.s);
console.log(eutil.bufferToHex(pubKey));
console.log(eutil.bufferToHex(eutil.privateToPublic(dk.privateKey)));
console.log(pubKey.equals(eutil.privateToPublic(dk.privateKey)));
*/
Meteor.startup(() => {

  // code to run on server at startup
  studyShare.new('0xf79e502ffdc85c91e643f61eebcadecadd7330e0', 'http://nucleushealth.io');
});
