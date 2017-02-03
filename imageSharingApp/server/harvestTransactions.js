import web3 from './web3.js';

var intervalId;

function start() {
  console.log('harvestTransactions.start');

  intervalId = Meteor.setInterval(() => {
    //console.log('harvestTransactions - harvesting');
    var studyShares = StudyShares.find({
      contractAddress : {$exists: false}
    });
    studyShares.forEach((studyShare) => {
      console.log(studyShare._id);
      var transactionReceipt = web3.eth.getTransactionReceipt(studyShare.transactionHash);
      console.log(transactionReceipt);
      if(transactionReceipt !== null) {
        StudyShares.update({
          _id : studyShare._id
        }, {
          $set : {
            contractAddress: transactionReceipt.contractAddress
          }
        })
      }
    });
  }, 1000);
}

function end() {

}

export default {
  start: start,
  end: end
}
