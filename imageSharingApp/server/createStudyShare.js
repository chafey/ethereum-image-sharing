
import studyShare from './studyShare';

export default function(recipient, url) {
  // insert record in db
  var studyShareId = StudyShares.insert({
    receipient: recipient,
    url: url
  });
  //console.log('studyShareId =', studyShareId);

  // create blockchain contract
  var p = studyShare.new('0xf79e502ffdc85c91e643f61eebcadecadd7330e0', 'http://nucleushealth.io');

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
