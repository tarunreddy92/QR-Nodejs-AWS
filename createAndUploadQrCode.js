const putObjFns = require('./index');
const QRCode = require('qrcode');

const str = "Tarun Reddy";
var file_name = Date.now() + "-" + Math.floor(Math.random() * 1000);

QRCode.toDataURL(str, function (err, generatedBase64Img) {
    // console.log('Generated Base64 image: ' + generatedBase64Img);
    putObjFns.putBase64ImageInS3(generatedBase64Img, file_name);
    putObjFns.putObjectInS3(generatedBase64Img, file_name);
});

putObjFns.saveFileToLocal(file_name, str);