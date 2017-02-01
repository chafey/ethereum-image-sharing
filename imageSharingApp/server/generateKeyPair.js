import keythereum from 'keythereum';
import eutil from 'ethereumjs-util';

export default function() {
  var dk = keythereum.create();

  return {
    address : eutil.bufferToHex(eutil.pubToAddress(eutil.privateToPublic(dk.privateKey))),
    publicKey :eutil.bufferToHex(eutil.privateToPublic(dk.privateKey)),
    privateKey : eutil.bufferToHex(dk.privateKey),
    iv: eutil.bufferToHex(dk.iv),
    salt: eutil.bufferToHex(dk.salt)
  };
}
