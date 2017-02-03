import eutil from 'ethereumjs-util';
import studyShare from './studyShare';
import web3 from './web3.js';
import keyPair from './keyPair.js';

var StudyShare = web3.eth.contract(studyShare.abi);

function toSignature(hexString) {
  return {
    r: Buffer.from(hexString.substr(2, 64), 'hex'),
    s: Buffer.from(hexString.substr(66, 64), 'hex'),
    v: parseInt(hexString.substr(130, 2), 16)
  }
}

var rootUrl = "http://localhost:3100/dicomweb";

WebApp.connectHandlers.use("/dicomweb", function(req, res, next) {
  //console.log('req:', req);
  //console.log('url:', req.url);
  //console.log('headers:', req.headers);
  var signature = req.headers["x-signature"];
  var timeStamp = req.headers["x-timestamp"];
  var resourceUrl = req.headers["x-resource-url"];
  var contractAddress = req.headers['x-contractaddress'];

  var sig = toSignature(signature);
  //console.log(sig);

  var hash = eutil.sha256(resourceUrl + ":" + timeStamp);

  var pubKey = eutil.ecrecover(hash, sig.v, sig.r, sig.s);

  //console.log(eutil.bufferToHex(pubKey));
  //console.log('address:', eutil.bufferToHex(eutil.publicToAddress(pubKey)));
  var address = eutil.bufferToHex(eutil.publicToAddress(pubKey));

  //console.log('contractAddress:', contractAddress);

  var studyShare = StudyShare.at(contractAddress);
  //console.log(studyShare);

  // check sender
  if(studyShare.sender() !== keyPair.address) {
    console.log("sender is unknown!");
    console.log(studyShare.sender());
    res.writeHead(404);
    res.end("");
    return;
  }

  // check receipient
  if(studyShare.recipient() !== address) {
    console.log("signer's address does not match receipient!");
    console.log(studyShare.recipient());
    console.log(address);
    res.writeHead(404);
    res.end("");
    return;
  }

  // check resource part
  if(studyShare.url() !== rootUrl + req.url) {
    console.log("URL does not match");
    console.log(studyShare.url() + '|');
    console.log(req.url + '|');
    res.writeHead(404);
    res.end("");
    return;
  }

  console.log("study access authorized!")
  res.writeHead(200);
  res.end("");
});
