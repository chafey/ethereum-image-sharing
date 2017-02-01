/*import keythereum from 'keythereum';
import eutil from 'ethereumjs-util';

var datadir = "/Users/chafey/src/Prototype/ethereum/ethereum-private-network/.datadir";
var keyObject = keythereum.importFromFile('0xf79e502ffdc85c91e643f61eebcadecadd7330e0', datadir);
var privateKey = eutil.bufferToHex(keythereum.recover('changeme', keyObject));
console.log('privateKey:', privateKey);
console.log('publicKey:', eutil.bufferToHex(eutil.privateToPublic(privateKey)));

export default {
    address: '0xf79e502ffdc85c91e643f61eebcadecadd7330e0',
    publicKey: eutil.bufferToHex(eutil.privateToPublic(privateKey)),
    privateKey: privateKey,
};*/

/*
export default {
  address: '0xf79e502ffdc85c91e643f61eebcadecadd7330e0',
  publicKey: '0x88035aa63f780a06b15916b12bfcf3fabeb9c2141e7953c0d3e80572dfcb3afbf19eca32d6ff9ae3b77778839046c7be42617361e423f4a53a0c1faa4c895602',
  privateKey: '0x582cf76fcbeac1d78924bb568ebca253a9fe74f51349ee08c695b63249bd3b6b'
}*/

export default {
  address: '0x1e2bde1ea8884e04d2896b7182d6d6c564f1de4c',
  publicKey: '0x8ceee213ccbafa245d6e18374d6ed02de64f039abde3c6bbd51bd958df5bb67f933b7f8c9fc841658fc9dc6ff20480183c6ff01886e9c6551ddab1d7592e020c',
  privateKey: '0x3fb8cb13cedd23a1a214cb45b3b4caaec7d2ff3efd182aec73e35dd3df339c83',
  iv : "0xc0d1b75a37cd5653814bc8b102d1e2c6",
  salt : "0xd61f1ec926987d7b6ff7c7293d80f1b4a802d6bacbbf6d913c18652a1f2d8e0d"
};
