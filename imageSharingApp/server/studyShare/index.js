import ctorRaw from './ctorRaw.js'
import ctorRpc from './ctorRpc.js'
import abiAndByteCode from './abiAndByteCode.js'

export default {
  new : ctorRaw,
  abi: abiAndByteCode.abi,
  byteCode: abiAndByteCode.byteCode
};
