import eutil from 'ethereumjs-util';
import etx from 'ethereumjs-tx';
import keyPair from '../keyPair.js';
import encodeConstructorParams from '../encodeConstructorParams.js';
import web3 from '../web3.js';
import abiAndByteCode from './abiAndByteCode.js'
import getNonce from '../getNonce.js';

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

  web3.eth.sendRawTransaction('0x' + tx.serialize().toString('hex'), function(err, hash) {
    if (!err) {
      console.log('transactionId:', hash);
      //var tx = web3.eth.getTransaction(hash);
      //console.log(tx);
      var id = setInterval(function() {
        console.log('getting transactionReceipt for ', hash);
        var receipt = web3.eth.getTransactionReceipt(hash);
        if(receipt !== null) {
          console.log('contract address:', receipt.contractAddress);
          //console.log(receipt);
          clearInterval(id);
        } else {
          //console.log('null transaction');
        }
      }, 1000);

    } else {
      console.log('error:', err);
    }
  });
}
