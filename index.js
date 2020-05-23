const AWS = require('aws-sdk');
const QRCode = require('qrcode');
const S3_BUCKET = "poc-qr-codes";
const s3bucket = new AWS.S3({ params: { Bucket: S3_BUCKET } });
var image_name = Date.now() + "-" + Math.floor(Math.random() * 1000);

function putObjectInS3(base64Image, fileName) {
	var content = base64Image.split(';')[0].split('/')[0]
	var type = base64Image.split(';')[0].split('/')[1]
	var data = {
		Key: `qr_${fileName}`,
		Body: base64Image, //.replace(/^data:image\/\w+;base64,/, ""),
		ContentEncoding: 'base64',
		ContentType: `${content}/${type}`
	};
	s3bucket.putObject(data, function (err, data) {
		if (err) {
			console.log(err);
			console.log('Error uploading data: ', data);
		} else {
			console.log(`Succesfully uploaded the image, ${fileName} to ${S3_BUCKET} bucket!`);
		}
	});
}

function putBase64ImageInS3(base64Image, imageName) {
	var content = base64Image.split(';')[0].split('/')[0]
	var type = base64Image.split(';')[0].split('/')[1]
	var data = {
		Key: `qr_${imageName}.${type}`,
		Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
		ContentEncoding: 'base64',
		ContentType: `${content}/${type}`
	};
	s3bucket.putObject(data, function (err, data) {
		if (err) {
			console.log(err);
			console.log('Error uploading data: ', data);
		} else {
			console.log(`Succesfully uploaded the image, ${imageName}.${type} to ${S3_BUCKET} bucket!`);
		}
	});
}

function saveFileToLocal(imageName, stringToEncode) {
	const filePath = "C:\\Users\\treddy\\Documents\\Personal Projects\\QR-Nodejs-AWS\\QR_Codes\\"
	QRCode.toFile("./QR_Codes/" + imageName + ".png", stringToEncode);
	console.log("File saved to " + filePath + imageName);
}

exports.putObjectInS3 = putObjectInS3;
exports.putBase64ImageInS3 = putBase64ImageInS3;
exports.saveFileToLocal = saveFileToLocal;