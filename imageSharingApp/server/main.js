import { Meteor } from 'meteor/meteor';

import createStudyShare from './createStudyShare.js';

import harvestTransactions from './harvestTransactions.js';

import keyPair from './keyPair.js';

import getStudy from './getStudy.js';

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

  harvestTransactions.start();

  // code to run on server at startup
  if(StudyShares.find().count() === 0) {
    createStudyShare(keyPair.address, 'http://localhost:3100/dicomweb/1.2.3.4.5');
  } else {
    getStudy("http://localhost:3100/dicomweb/1.2.3.4.5", keyPair);
  }

});
