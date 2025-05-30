/* **************************************************************************
  SigCaptX-Functions.js
   
  This contains various JavaScript functions used by the 
  SigCaptX React code sample for signature capture
	
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v2.0  Uses React state objects to reference the DOM instead of going direct
  
***************************************************************************/
//  This function enables the Restore button if the user has selected the option to output SigText
function enableRestoreButton() {
  if (ChkBoxSigText.state.checked) {
    Button.setState({ disabled: false });
  }
  else {
    Button.setState({ disabled: true });
  }
}

/*  This is the main function for capturing the signature from the pad */
function capture() {
  if (wgssSignatureSDK == null || !wgssSignatureSDK.running || null == dynCapt) {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.Capture);   // See SigCaptX-SessionControl.js
    return;
  }

  // Construct a hash object to contain the hash
  var hash = new wgssSignatureSDK.Hash(onHashConstructor);

  function onHashConstructor(hashV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      GetHash(hash, onGetInitialHash);
    }
    else {
      print("Hash Constructor error: " + status);
      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        print("Error: invalid session. Restarting the session.");
        actionWhenRestarted(window.Capture);
      }
    }
  }

  // If the hash value has been calculated successfully next steps is to capture the signature
  function onGetInitialHash() {
    // Get the first and last names from their respective state objects
    var firstName = FirstName.state.firstName;
    // var lastName = LastName.state.lastName;
    var fullName = firstName;

    dynCapt.Capture(sigCtl, fullName, "Persetujuan Dokumen", hash, null, onDynCaptCapture);
  }

  function onDynCaptCapture(dynCaptV, SigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
      print("Error: invalid session. Restarting the session.");
      actionWhenRestarted(window.Capture);  // See SigCaptX-SessionControl.js
    }
    else {
      /* Check the status returned from the signature capture */
      switch (status) {
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
          sigObj = SigObjV;
          print("Signature captured successfully");

          /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
          // if (ChkBoxB64.state.checked) {
          //   var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputBase64 | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          // }
          // else {
          //   var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          // }
          var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputBase64 | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmap);
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
          print("Signature capture cancelled");
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
          print("No capture service available");
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
          print("Tablet Error");
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
          print("No valid Signature Capture licence found");
          break;

        default:
          print("Capture Error " + status);
          break;
      }
    }
  }

  function onRenderBitmap(sigObjV, bmpObj, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      // var useB64Image = ChkBoxB64.state.checked;

      // print("base64_image:>" + bmpObj + "<");
      img = new Image();
      img.src = "data:image/png;base64," + bmpObj;
      ImageBox.setState({ imageSrc: img.src, imgBase64: bmpObj });
      // IsiB64.setState({ codeB64: bmpObj })


      /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
      // if (useB64Image) {
      //   print("base64_image:>" + bmpObj + "<");
      //   img = new Image();
      //   img.src = "data:image/png;base64," + bmpObj;
      //   ImageBox.setState({ imageSrc: img.src });
      //   IsiB64.setState({ codeB64: bmpObj })
      // }
      // else {
      //   /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
      //   ImageBox.setState({ imageSrc: bmpObj.image.src });
      // }

      /* If the user chose the option to show the SigText value on the form then call the function to do this */
      // if (ChkBoxSigText.state.checked) {
      //   sigObjV.GetSigText(onGetSigText);
      // }
    }
    else {
      print("Signature Render Bitmap error: " + status);
    }
  }

  /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
  function onGetSigText(sigObjV, text, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      TextSignature.setState({ txtSignature: text });
      // Keep the SigText value in a global variable so it can be
      // accessed later by the Restore option if needed without
      // having to go via the state object itself
      sigText = text;
      console.log("sigText stored");
    }
    else {
      print("Signature Render Bitmap error: " + status);
    }
  }
  return "Captured";
}

/* This function displays the details of the signature in the text box on the HTML form */

function displaySignatureDetails() {
  if (!window.wgssSignatureSDK.running || null == window.sigObj) {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.DisplaySignatureDetails);  // See SigCaptX-SessionControl.js
    return;
  }
  sigObj.GetIsCaptured(onGetIsCaptured);

  function onGetIsCaptured(sigObj, isCaptured, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      if (!isCaptured) {
        print("No signature has been captured yet.");
        return;
      }
      sigObj.GetWho(onGetWho);
    }
    else {
      print("Signature GetWho error: " + status);
      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.displaySignatureDetails);  // See SigCaptX-SessionControl.js
      }
    }
  }

  function onGetWho(sigObjV, who, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      print("  Name:   " + who);
      var tz = wgssSignatureSDK.TimeZone.TimeLocal;
      sigObj.GetWhen(tz, onGetWhen);
    }
    else {
      print("Signature GetWho error: " + status);
    }
  }

  function onGetWhen(sigObjV, when, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      print("  Date:   " + when.toString());
      sigObj.GetWhy(onGetWhy);
    }
    else {
      print("Signature GetWhen error: " + status);
    }
  }

  function onGetWhy(sigObjV, why, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      print("  Reason: " + why);
    }
    else {
      print("Signature GetWhy error: " + status);
    }
  }
}

// This function calculates a hash value using the first and last names on the HTML form
function GetHash(hash, callback) {
  print("Creating hash:");
  hash.Clear(onClear);

  function onClear(hashV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      hash.PutType(wgssSignatureSDK.HashType.HashMD5, onPutType);
    }
    else {
      print("Hash Clear error: " + status);
    }
  }

  function onPutType(hashV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      var vFname = new wgssSignatureSDK.Variant();
      vFname.Set(FirstName.state.firstName);
      // hash.Add(vFname, onAddFname);
      hash.Add(vFname, onAddLname);
    }
    else {
      print("Hash PutType error: " + status);
    }
  }

  // function onAddFname(hashV, status) {
  //   if (wgssSignatureSDK.ResponseStatus.OK == status) {
  //     var vLname = new wgssSignatureSDK.Variant();
  //     vLname.Set(LastName.state.lastName);
  //     hash.Add(vLname, onAddLname);
  //   }
  //   else {
  //     print("Hash Add error: " + status);
  //   }
  // }

  function onAddLname(hashV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      callback();
    }
    else {
      print("Hash Add error: " + status);
    }
  }
}

// This function recalculates the hash value from the first and last names
// and checks it against the hash embedded in the signature object
function verifySignedData() {
  print("Verifying signed data...");
  if (null == sigObj) {
    actionWhenRestarted(window.VerifySig);
    return;
  }
  var hash = null;
  sigObj.GetIsCaptured(onGetIsCaptured);

  function onGetIsCaptured(sigObjV, isCaptured, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      if (isCaptured) {
        hash = new wgssSignatureSDK.Hash(onHashConstructor);
      }
      else {
        print("Signature not captured");
      }
    }
    else {
      print("GetIsCaptured error: " + status);
      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        print("Error: invalid session. Restarting the session.");
        actionWhenRestarted(window.VerifySig);
      }
    }
  }

  function onHashConstructor(hashV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      GetHash(hash, onGetHashForVerification);
    }
    else {
      print("Hash Constructor error: " + status);
    }
  }

  function onGetHashForVerification() {
    sigObj.CheckSignedData(hash, onCheckSignedData);
  }

  function onCheckSignedData(hash, status) {
    print("Verify result: " + status);
    if (wgssSignatureSDK.SignedData.DataGood == status) {
      print("Signed Data OK");
    }
    else {
      print("Signed Data Has Changed");
    }
  }
}

/* This function clears the current signature image from the signature control on the form */
function clearSignature() {
  ImageBox.setState({ imageSrc: "" });
  IsiB64.setState({ codeB64: "" });
  if (null == sigObj) {
    actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
    return;
  }
  sigObj.Clear(onClearSig);

  function onClearSig(sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK != status) {
      print("ClearSignature() error: " + status);
      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
      }
    }
  }
}

/* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
function setSignatureText() {
  if (null == window.sigObj) {
    print("sigObj is null, unable to restore");
    actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
    return;
  }
  /* First of all take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
  console.log("Restoring signature from sigText: " + sigText);
  var text = sigText;
  window.sigObj.PutSigText(text, onPutSigText);

  function onPutSigText(sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      /* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to geberate a signature image */
      var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;

      sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, ImageBox.state.width, ImageBox.state.height, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmapFromSigText);
    }
    else {
      print("SetSignatureText() error: " + status);
      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
      }
    }
  }

  /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
  function onRenderBitmapFromSigText(sigObjV, bmpObj, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      ImageBox.setState({ imageSrc: bmpObj.image.src });
    }
    else {
      print("Signature Render Bitmap error: " + status);
    }
  }
}
