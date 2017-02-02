import eutil from 'ethereumjs-util';
import etx from 'ethereumjs-tx';
import keyPair from '../keyPair.js';
import encodeConstructorParams from '../encodeConstructorParams.js';
import web3 from '../web3.js';
import abiAndByteCode from './abiAndByteCode.js'
import getNonce from '../getNonce.js';

var StudyShare = web3.eth.contract(abiAndByteCode.abi);

// Example of how to invoke methods with sendRawTransaction
// https://github.com/ether-camp/wallet/blob/master/app/public/src/contracts/wallet.js
// https://forum.ethereum.org/discussion/5039/how-to-use-web3-js-to-sign-a-contract-call
export default function(recipient, url) {
  console.log('new StudyShare(', recipient, ',', url, ')');
  var args = [
      recipient,
      url
  ];

  const contract = web3.eth.contract(abiAndByteCode.abi);
  const contractData = contract.new.getData({
    data: abiAndByteCode.byteCode
  });

  //console.log('contractData:', contractData);

  var ctorParamsAsBytes = encodeConstructorParams(abiAndByteCode.abi, args);

  var txData = contractData + ctorParamsAsBytes;

  var nonce = getNonce(keyPair.address);

  //console.log('nonce=', nonce);

  var tx = new etx({
    to: null,
    nonce: nonce,
    gasLimit: 4700000,//web3.toHex(4700000),
    gasPrice: 20000000000,//web3.toHex(20000000000),
    data: txData,
  });
  tx.sign(Buffer.from(keyPair.privateKey.substr(2), 'hex'));

  var p = new Promise((resolve, reject) => {
    web3.eth.sendRawTransaction('0x' + tx.serialize().toString('hex'), function(err, transactionHash) {
      if (!err) {
        console.log('transactionId:', transactionHash);
        resolve(transactionHash);
      }
    });
  });

  return p;
}
