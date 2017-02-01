pragma solidity ^0.4.2;

contract StudyShare {

  // The address of the sender of the study share.  Presumably the sender has
  // permission to share the study being shared - the dicomweb server will
  // have to verify this
  address public sender;

  // The address of the recipient of the study share.  The recipient can
  // access the dicom web study by signing the request using its private key.
  // The dicom web server would then validate the signature to ensure the
  // recipient owns the private key.
  // NOTE: This could be generalized into an access control list so the
  // study clould be shared to other recipients
  address public recipient;

  // Base URL to a dicomweb study.  This could be generalized to be any
  // resource - e.g. FHIR, DICOMWeb or other..
  string public url;

  function StudyShare(address _recipient, string _url) {
    sender = msg.sender;
    recipient = _recipient;
    url = _url;
  }

}
