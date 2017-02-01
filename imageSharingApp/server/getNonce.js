import keyPair from './keyPair.js';
import web3 from './web3.js';

var initializedAddresses = {};

function init(address) {
  if(Nonces.findOne({address:address}) === undefined) {
    var nonce = web3.eth.getTransactionCount(address, 'pending')
    console.log('Initializing Nonce for', address, 'to', nonce);
    Nonces.insert({
      address: address,
      nonce: nonce
    });
  } else {
    var txCount = web3.eth.getTransactionCount(address, 'pending');
    var nonce = Nonces.findOne({address:address});
    if(nonce.nonce < txCount) {
      console.log('Updating out of date nonce for', address, 'to', txCount);
      Nonces.update({address:address}, {$set: {nonce : txCount}});
    } else {
      console.log('Nonce for', address, 'set to', nonce.nonce);
    }
  }
}

export default function(address) {

  if(!initializedAddresses.address) {
    init(address);
    initializedAddresses.address = true;
  }

  var addressNonce = Nonces.findOne({address: address});
  //console.log('nonce =', addressNonce.nonce);
  Nonces.update({
    address:address
  }, {
    $inc: {nonce: 1}
  });
  return addressNonce.nonce;
};
