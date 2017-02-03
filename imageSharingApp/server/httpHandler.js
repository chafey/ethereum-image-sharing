import eutil from 'ethereumjs-util';
import studyShare from './studyShare';
import web3 from './web3.js';
import keyPair from './keyPair.js';

var StudyShare = web3.eth.contract(studyShare.abi);

var rootUrl = "http://localhost:3100/dicomweb";

WebApp.connectHandlers.use("/dicomweb", function(req, res, next) {
  //console.log('req:', req);
  //console.log('url:', req.url);
  //console.log('headers:', req.headers);
  var r = req.headers["x-secp256k1-r"];
  var s = req.headers["x-secp256k1-s"];
  var v = req.headers["x-secp256k1-v"];
  var timeStamp = req.headers["x-timestamp"];
  var contractAddress = req.headers['x-contractaddress'];

  var sig = {
    r : Buffer.from(r, 'hex'),
    s : Buffer.from(s, 'hex'),
    v : parseInt(v)
  };
  //console.log(sig);

  var hash = eutil.sha256(contractAddress + timeStamp);

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
