import web3 from '../web3.js';
import abiAndByteCode from './abiAndByteCode.js'
import keyPair from '../keyPair.js';

export default function (recipient, url) {
  console.log('new StudyShare(', recipient, ',', url, ')');

  var address = keyPair.address; //web3.eth.accounts[0]


  web3.personal.unlockAccount(address, 'changeme');
  // NOTE: Unlocking an account requires geth to expose the personal API via
  // RPC which is a major security hole.  This is just the most convenient
  // for a prototype - the right way should be to sign the transaction
  // and submit it via sendRawTransaction

  var studyShareContract = web3.eth.contract(abiAndByteCode.abi);
  var studyShare = studyShareContract.new(
     {
       from: address,
       data: abiAndByteCode.byteCode,
       gas: '4700000'
     }, function (e, contract){
      //console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
           var tx = web3.eth.getTransaction(contract.transactionHash);
           console.log(tx);
      }
   });
}
