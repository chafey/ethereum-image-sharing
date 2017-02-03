
import studyShare from './studyShare';

export default function(recipient, url) {
  // insert record in db
  var studyShareId = StudyShares.insert({
    receipient: recipient,
    url: url
  });
  //console.log('studyShareId =', studyShareId);

  // create blockchain contract
  var p = studyShare.new(recipient, url);

  // update record in db
  p.then((transactionHash) => {
    console.log('transactionHash:', transactionHash);
    StudyShares.update(
      {
        _id : studyShareId
      },{
        $set: {
          transactionHash: transactionHash
        }
      });
  });
}
