/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { Image } from 'antd';
import React, { useState, useContext } from 'react'
import WacomGSS from "wacomgss-npm";
import "./demoButtons.css"
import HdContext from '../../../HdContext';

const {
  PasiensContext,
} = HdContext;

function Signaturea() {
  const props = useContext(PasiensContext)

  const [ttdCoba, setTtdCoba] = useState("")

  var m_btns; // The array of buttons that we are emulating.
  var m_clickBtn = -1;
  var intf;
  var formDiv;
  var protocol;
  var m_usbDevices;
  var tablet;
  var m_capability;
  var m_inkThreshold;
  var m_imgData;
  var m_encodingMode;
  var ctx;
  var canvas;
  var modalBackground;
  var formDiv;
  var m_penData;
  var lastPoint;
  var isDown;

  var Q = require('./q.js')

  var retry = 0;
  // function checkForSigCaptX() {
  //   // Establishing a connection to SigCaptX Web Service can take a few seconds,
  //   // particularly if the browser itself is still loading/initialising
  //   // or on a slower machine.
  //   retry = retry + 1;
  //   if (WacomGSS.STU.isServiceReady()) {
  //     retry = 0;
  //     console.log("SigCaptX Web Service: ready");
  //   } else {
  //     console.log("SigCaptX Web Service: not connected");
  //     if (retry < 20) {
  //       setTimeout(checkForSigCaptX, 1000);
  //     }
  //     else {
  //       alert("Unable to establish connection to SigCaptX");
  //     }
  //   }

  // }

  // setTimeout(checkForSigCaptX, 500);

  function onDCAtimeout() {
    // Device Control App has timed-out and shut down
    // For this sample, we just closedown tabletDemo (assumking it's running)
    console.log("DCA disconnected");
    setTimeout(close, 0);
  }

  function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.Contains = function (pt) {
      if (((pt.x >= this.x) && (pt.x <= (this.x + this.width))) &&
        ((pt.y >= this.y) && (pt.y <= (this.y + this.height)))) {
        return true;
      } else {
        return false;
      }
    }
  }

  // In order to simulate buttons, we have our own Button class that stores the bounds and event handler.
  // Using an array of these makes it easy to add or remove buttons as desired.
  //  delegate void ButtonClick();
  function Button() {
    this.Bounds; // in Screen coordinates
    this.Text;
    this.Click;
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }


  function createModalWindow(width, height) {
    modalBackground = document.createElement('div');
    modalBackground.id = "modal-background";
    modalBackground.className = "active";
    modalBackground.style.width = window.innerWidth;
    modalBackground.style.height = window.innerHeight;
    document.getElementsByTagName('body')[0].appendChild(modalBackground);

    formDiv = document.createElement('div');
    formDiv.id = "signatureWindow";
    formDiv.className = "active";
    formDiv.style.top = (window.innerHeight / 2) - (height / 2) + "px";
    formDiv.style.left = (window.innerWidth / 2) - (width / 2) + "px";
    formDiv.style.width = width + "px";
    formDiv.style.height = height + "px";
    document.getElementsByTagName('body')[0].appendChild(formDiv);

    canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.height = formDiv.offsetHeight;
    canvas.width = formDiv.offsetWidth;
    formDiv.appendChild(canvas);
    ctx = canvas.getContext("2d");

    if (canvas.addEventListener) {
      canvas.addEventListener("click", onCanvasClick, false);
    } else if (canvas.attachEvent) {
      canvas.attachEvent("onClick", onCanvasClick);
    } else {
      canvas["onClick"] = onCanvasClick;
    }
  }

  function disconnect() {
    var deferred = Q.defer();
    if (!(undefined === tablet || null === tablet)) {
      var p = new WacomGSS.STU.Protocol();
      tablet.setInkingMode(p.InkingMode.InkingMode_Off)
        .then(function (message) {
          console.log("received: " + JSON.stringify(message));
          return tablet.endCapture();
        })
        .then(function (message) {
          console.log("received: " + JSON.stringify(message));
          if (m_imgData !== null) {
            return m_imgData.remove();
          }
          else {
            return message;
          }
        })
        .then(function (message) {
          console.log("received: " + JSON.stringify(message));
          m_imgData = null;
          return tablet.setClearScreen();
        })
        .then(function (message) {
          console.log("received: " + JSON.stringify(message));
          return tablet.disconnect();
        })
        .then(function (message) {
          console.log("received: " + JSON.stringify(message));
          tablet = null;
          // clear canvas
          clearCanvas(canvas, ctx);
        })
        .then(function (message) {
          deferred.resolve();
        })
        .fail(function (message) {
          console.log("disconnect error: " + message);
          deferred.resolve();
        })
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "";
    WacomGSS.STU.close();
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage;                            // Webkit, Safari, Chrome
  });

  // Error-derived object for Device Control App not ready exception
  function DCANotReady() { }
  DCANotReady.prototype = new Error();

  const tabletDemo = () => {
    var p = new WacomGSS.STU.Protocol();
    var intf;
    // var m_usingEncryption = false;
    var m_encH;
    var m_encH2;
    var m_encH2Impl;

    WacomGSS.STU.isDCAReady()
      .then(function (message) {
        if (!message) {
          throw new DCANotReady();
        }
        // Set handler for Device Control App timeout
        WacomGSS.STU.onDCAtimeout = onDCAtimeout;

        return WacomGSS.STU.getUsbDevices();
      })
      .then(function (message) {
        if (message == null || message.length == 0) {
          throw new Error("No STU devices found");
        }
        console.log("received 1 : " + JSON.stringify(message));
        m_usbDevices = message;
        return WacomGSS.STU.isSupportedUsbDevice(m_usbDevices[0].idVendor, m_usbDevices[0].idProduct);
      })
      .then(function (message) {
        console.log("received 2 : " + JSON.stringify(message));
        intf = new WacomGSS.STU.UsbInterface();
        return intf.Constructor();
      })
      .then(function (message) {
        console.log("received 3 : " + JSON.stringify(message));
        return intf.connect(m_usbDevices[0], true);
      })
      // .then(function (message) {
      //   console.log("received 4 : " + JSON.stringify(message));
      //   console.log(0 == message.value ? "connected!" : "not connected");
      //   if (0 == message.value) {
      //     m_encH = new WacomGSS.STU.EncryptionHandler(new encryptionHandler());
      //     return m_encH.Constructor();
      //   }
      // })
      // .then(function (message) {
      //   console.log("received: " + JSON.stringify(message));
      //   m_encH2Impl = new encryptionHandler2();
      //   m_encH2 = new WacomGSS.STU.EncryptionHandler2(m_encH2Impl);
      //   return m_encH2.Constructor();
      // })
      .then(function (message) {
        console.log("received4 : " + JSON.stringify(message));
        tablet = new WacomGSS.STU.Tablet();
        return tablet.Constructor(intf, m_encH, m_encH2);
      })
      .then(function (message) {
        console.log("received5 : " + JSON.stringify(message));
        intf = null;
        return tablet.getInkThreshold();
      })
      .then(function (message) {
        console.log("received6 : " + JSON.stringify(message));
        m_inkThreshold = message;
        return tablet.getCapability();
      })
      .then(function (message) {
        console.log("received7 : " + JSON.stringify(message));
        m_capability = message;
        createModalWindow(m_capability.screenWidth, m_capability.screenHeight);
        return tablet.getInformation();
      })
      .then(function (message) {
        console.log("received8 : " + JSON.stringify(message));
        return tablet.getInkThreshold();
      })
      .then(function (message) {
        console.log("received9 : " + JSON.stringify(message));
        return tablet.getProductId();
      })
      .then(function (message) {
        console.log("received10 : " + JSON.stringify(message));
        return WacomGSS.STU.ProtocolHelper.simulateEncodingFlag(message, m_capability.encodingFlag);
      })
      .then(function (message) {
        console.log("received11 : " + JSON.stringify(message));
        var encodingFlag = message;
        if ((encodingFlag & p.EncodingFlag.EncodingFlag_24bit) != 0) {
          return tablet.supportsWrite()
            .then(function (message) {
              m_encodingMode = message ? p.EncodingMode.EncodingMode_24bit_Bulk : p.EncodingMode.EncodingMode_24bit;
            });
        } else if ((encodingFlag & p.EncodingFlag.EncodingFlag_16bit) != 0) {
          return tablet.supportsWrite()
            .then(function (message) {
              m_encodingMode = message ? p.EncodingMode.EncodingMode_16bit_Bulk : p.EncodingMode.EncodingMode_16bit;
            });
        } else { // assumes 1bit is available
          m_encodingMode = p.EncodingMode.EncodingMode_1bit;
        }
      })
      .then(function (message) {
        console.log("received12 : " + JSON.stringify(message));
        return tablet.isSupported(p.ReportId.ReportId_EncryptionStatus); // v2 encryption
      })
      // .then(function (message) {
      //   console.log("received13 : " + JSON.stringify(message));
      //   m_usingEncryption = message;
      //   // if the encryption script is missing turn off encryption regardless
      //   if (typeof window.sjcl == 'undefined') {
      //     console.log("sjcl not found - encryption disabled");
      //     m_usingEncryption = false;
      //   }
      //   return tablet.getDHprime();
      // })
      // .then(function (dhPrime) {
      //   console.log("received14 : " + JSON.stringify(dhPrime));
      //   return WacomGSS.STU.ProtocolHelper.supportsEncryption_DHprime(dhPrime); // v1 encryption
      // })
      // .then(function (message) {
      //   console.log("received15 : " + JSON.stringify(message));
      //   m_usingEncryption = (message ? true : m_usingEncryption);
      //   return tablet.setClearScreen();
      // })
      // .then(function (message) {
      //   if (m_usingEncryption) {
      //     return tablet.startCapture(0xc0ffee);
      //   }
      //   else {
      //     return message;
      //   }
      // })
      // .then(function (message) {
      //   if (typeof m_encH2Impl.error !== 'undefined') {
      //     throw new Error("Encryption failed, restarting demo");
      //   }
      //   return message;
      // })
      .then(function (message) {
        console.log("received16 : " + JSON.stringify(message));
        return tablet.isSupported(p.ReportId.ReportId_PenDataOptionMode);
      })
      .then(function (message) {
        console.log("received17 : " + JSON.stringify(message));
        if (message) {
          return tablet.getProductId()
            .then(function (message) {
              var penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_None;
              switch (message) {
                case WacomGSS.STU.ProductId.ProductId_520A:
                  penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_TimeCount;
                  break;
                case WacomGSS.STU.ProductId.ProductId_430:
                case WacomGSS.STU.ProductId.ProductId_530:
                  penDataOptionMode = p.PenDataOptionMode.PenDataOptionMode_TimeCountSequence;
                  break;
                default:
                  console.log("Unknown tablet supporting PenDataOptionMode, setting to None.");
              };
              return tablet.setPenDataOptionMode(penDataOptionMode);
            });
        }
        else {
          m_encodingMode = p.EncodingMode.EncodingMode_1bit;
          return m_encodingMode;
        }
      })
      .then(function (message) {
        console.log("received18 : " + JSON.stringify(message));
        addButtons();
        var canvasImage = canvas.toDataURL("image/jpeg");
        return WacomGSS.STU.ProtocolHelper.resizeAndFlatten
          (
            canvasImage,
            0,
            0,
            0,
            0,
            m_capability.screenWidth,
            m_capability.screenHeight,
            m_encodingMode,
            1,
            false,
            0,
            true
          );
      })
      .then(function (message) {
        m_imgData = message;
        console.log("received19 : " + JSON.stringify(message));
        return tablet.writeImage(m_encodingMode, message);
      })
      // .then(function (message) {
      //   if (m_encH2Impl.error) {
      //     throw new Error("Encryption failed, restarting demo");
      //   }
      //   return message;
      // })
      .then(function (message) {
        console.log("received20 : " + JSON.stringify(message));
        return tablet.setInkingMode(p.InkingMode.InkingMode_On);
      })
      .then(function (message) {
        console.log("received21 : " + JSON.stringify(message));
        var reportHandler = new WacomGSS.STU.ProtocolHelper.ReportHandler();
        lastPoint = { "x": 0, "y": 0 };
        isDown = false;
        ctx.lineWidth = 1;

        var penData = function (report) {
          //console.log("report: " + JSON.stringify(report));
          m_penData.push(report);
          processButtons(report, canvas);
          processPoint(report, canvas, ctx);
        }
        var penDataEncryptedOption = function (report) {
          //console.log("reportOp: " + JSON.stringify(report));
          m_penData.push(report.penData[0], report.penData[1]);
          processButtons(report.penData[0], canvas);
          processPoint(report.penData[0], canvas, ctx);
          processButtons(report.penData[1], canvas);
          processPoint(report.penData[1], canvas, ctx);
        }

        var log = function (report) {
          //console.log("report: " + JSON.stringify(report));
        }

        var decrypted = function (report) {
          //console.log("decrypted: " + JSON.stringify(report));
        }
        m_penData = new Array();
        reportHandler.onReportPenData = penData;
        reportHandler.onReportPenDataOption = penData;
        reportHandler.onReportPenDataTimeCountSequence = penData;
        reportHandler.onReportPenDataEncrypted = penDataEncryptedOption;
        reportHandler.onReportPenDataEncryptedOption = penDataEncryptedOption;
        reportHandler.onReportPenDataTimeCountSequenceEncrypted = penData;
        reportHandler.onReportDevicePublicKey = log;
        // reportHandler.onReportEncryptionStatus = log;
        reportHandler.decrypt = decrypted;
        return reportHandler.startReporting(tablet, true);
      })
      .fail(function (ex) {
        console.log(ex);

        // if (ex instanceof DCANotReady) {
        //   // Device Control App not detected 
        //   // Reinitialize and re-try
        //   WacomGSS.STU.Reinitialize();
        //   setTimeout(tabletDemo, 1000);
        // }
        // else {
        //   // Some other error - Inform the user and closedown 
        //   alert("tabletDemo failed:\n" + ex);
        //   setTimeout(close(), 0);
        // }
      });
  }

  function addButtons() {
    m_btns = new Array(3);
    m_btns[0] = new Button();
    m_btns[1] = new Button();
    m_btns[2] = new Button();

    if (m_usbDevices[0].idProduct != WacomGSS.STU.ProductId.ProductId_300) {
      // Place the buttons across the bottom of the screen.
      var w2 = m_capability.screenWidth / 3;
      var w3 = m_capability.screenWidth / 3;
      var w1 = m_capability.screenWidth - w2 - w3;
      var y = m_capability.screenHeight * 6 / 7;
      var h = m_capability.screenHeight - y;

      m_btns[0].Bounds = new Rectangle(0, y, w1, h);
      m_btns[1].Bounds = new Rectangle(w1, y, w2, h);
      m_btns[2].Bounds = new Rectangle(w1 + w2, y, w3, h);
    } else {
      // The STU-300 is very shallow, so it is better to utilise
      // the buttons to the side of the display instead.

      var x = m_capability.screenWidth * 3 / 4;
      var w = m_capability.screenWidth - x;

      var h2 = m_capability.screenHeight / 3;
      var h3 = m_capability.screenHeight / 3;
      var h1 = m_capability.screenHeight - h2 - h3;

      m_btns[0].Bounds = new Rectangle(x, 0, w, h1);
      m_btns[1].Bounds = new Rectangle(x, h1, w, h2);
      m_btns[2].Bounds = new Rectangle(x, h1 + h2, w, h3);
    }

    m_btns[0].Text = "OK";
    m_btns[1].Text = "Clear";
    m_btns[2].Text = "Cancel";
    m_btns[0].Click = btnOk_Click;
    m_btns[1].Click = btnClear_Click;
    m_btns[2].Click = btnCancel_Click;
    clearCanvas(canvas, ctx);
    drawButtons();
  }

  function drawButtons() {
    // This application uses the same bitmap for both the screen and client (window).

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.font = "30px Arial";

    // Draw the buttons
    for (var i = 0; i < m_btns.length; ++i) {
      //if (useColor)
      {
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(m_btns[i].Bounds.x, m_btns[i].Bounds.y, m_btns[i].Bounds.width, m_btns[i].Bounds.height);
      }

      ctx.fillStyle = "black";
      ctx.rect(m_btns[i].Bounds.x, m_btns[i].Bounds.y, m_btns[i].Bounds.width, m_btns[i].Bounds.height);
      var xPos = m_btns[i].Bounds.x + ((m_btns[i].Bounds.width / 2) - (ctx.measureText(m_btns[i].Text).width / 2));
      var yOffset;
      if (m_usbDevices[0].idProduct == WacomGSS.STU.ProductId.ProductId_300)
        yOffset = 28;
      else if (m_usbDevices[0].idProduct == WacomGSS.STU.ProductId.ProductId_430)
        yOffset = 26;
      else
        yOffset = 40;
      ctx.fillText(m_btns[i].Text, xPos, m_btns[i].Bounds.y + yOffset);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  function clearScreen() {
    clearCanvas(canvas, ctx);
    drawButtons();
    m_penData = new Array();
    tablet.writeImage(m_encodingMode, m_imgData);
  }

  function btnOk_Click() {
    // You probably want to add additional processing here.
    generateImage();
    setTimeout(close, 0);
  }

  function btnCancel_Click() {
    // You probably want to add additional processing here.
    setTimeout(close, 0);
  }

  function btnClear_Click() {
    // You probably want to add additional processing here.
    console.log("clear!");
    clearScreen();
  }

  function distance(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
  }

  function clearCanvas(in_canvas, in_ctx) {
    in_ctx.save();
    in_ctx.setTransform(1, 0, 0, 1, 0, 0);
    in_ctx.fillStyle = "white";
    in_ctx.fillRect(0, 0, in_canvas.width, in_canvas.height);
    in_ctx.restore();
  }

  function processButtons(point, in_canvas) {
    var nextPoint = {};
    nextPoint.x = Math.round(in_canvas.width * point.x / m_capability.tabletMaxX);
    nextPoint.y = Math.round(in_canvas.height * point.y / m_capability.tabletMaxY);
    var isDown2 = (isDown ? !(point.pressure <= m_inkThreshold.offPressureMark) : (point.pressure > m_inkThreshold.onPressureMark));

    var btn = -1;
    for (var i = 0; i < m_btns.length; ++i) {
      if (m_btns[i].Bounds.Contains(nextPoint)) {
        btn = i;
        break;
      }
    }

    if (isDown && !isDown2) {
      if (btn != -1 && m_clickBtn === btn) {
        m_btns[btn].Click();
      }
      m_clickBtn = -1;
    }
    else if (btn != -1 && !isDown && isDown2) {
      m_clickBtn = btn;
    }
    return (btn == -1);
  }

  function processPoint(point, in_canvas, in_ctx) {
    var nextPoint = {};
    nextPoint.x = Math.round(in_canvas.width * point.x / m_capability.tabletMaxX);
    nextPoint.y = Math.round(in_canvas.height * point.y / m_capability.tabletMaxY);
    var isDown2 = (isDown ? !(point.pressure <= m_inkThreshold.offPressureMark) : (point.pressure > m_inkThreshold.onPressureMark));

    if (!isDown && isDown2) {
      lastPoint = nextPoint;
    }

    if ((isDown2 && 10 < distance(lastPoint, nextPoint)) || (isDown && !isDown2)) {
      in_ctx.beginPath();
      in_ctx.moveTo(lastPoint.x, lastPoint.y);
      in_ctx.lineTo(nextPoint.x, nextPoint.y);
      in_ctx.stroke();
      in_ctx.closePath();
      lastPoint = nextPoint;
    }

    isDown = isDown2;
  }

  function generateImage() {
    var signatureImage = document.getElementById("signatureImage");
    console.log(signatureImage);
    var signatureCanvas = document.createElement("canvas");
    signatureCanvas.id = "signatureCanvas";
    signatureCanvas.height = signatureImage.height;
    // console.log(signatureImage.height);
    signatureCanvas.width = signatureImage.width;
    // console.log(signatureImage.width);
    var signatureCtx = signatureCanvas.getContext("2d");

    clearCanvas(signatureCanvas, signatureCtx);
    signatureCtx.lineWidth = 1;
    signatureCtx.strokeStyle = 'black';
    lastPoint = { "x": 0, "y": 0 };
    isDown = false;
    for (var i = 0; i < m_penData.length; i++) {
      processPoint(m_penData[i], signatureCanvas, signatureCtx);
    }
    // signatureImage.src = signatureCanvas.toDataURL();
    console.log("image: ", signatureCanvas.toDataURL().substr(22));
    props.setTtdKeluargaPasien(signatureCanvas.toDataURL().substr(22))
  }

  function close() {
    // Clear handler for Device Control App timeout
    WacomGSS.STU.onDCAtimeout = null;

    disconnect();
    document.getElementsByTagName('body')[0].removeChild(modalBackground);
    document.getElementsByTagName('body')[0].removeChild(formDiv);
  }

  function onCanvasClick(event) {
    // Enable the mouse to click on the simulated buttons that we have displayed.

    // Note that this can add some tricky logic into processing pen data
    // if the pen was down at the time of this click, especially if the pen was logically
    // also 'pressing' a button! This demo however ignores any that.

    var posX = event.pageX - formDiv.offsetLeft;
    var posY = event.pageY - formDiv.offsetTop;

    for (var i = 0; i < m_btns.length; i++) {
      if (m_btns[i].Bounds.Contains(new Point(posX, posY))) {
        m_btns[i].Click();
        break;
      }
    }
  }
  return (
    <div>
      <div id="signatureDiv">
        {/* <Image
          src={ttdCoba}
          height={100}
          style={{ marginTop: '5px' }}
        /> */}
        <img
          id="signatureImage"
          src={props.jenisPenerima === "1" ? `data:image/jpeg;base64,` + props.ttdKeluargaPasien : `data:image/jpeg;base64,` + props.ttdPasien} />
      </div>
      <div>
        <input
          type="button"
          id="signButton"
          value="Ttd"
          onClick={() => tabletDemo()}
          disabled={props.jenisPenerima === "1" ? false : true} />
      </div>
    </div>
  )
}

export default Signaturea

