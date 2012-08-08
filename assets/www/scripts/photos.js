var loaded = false;
var currentPhoto = null;

function onPhotosLoad() {
	// only load the camera selector on first load
	if(!loaded) {
		navigator.camera.getPicture(onPhotoLoadSuccess, onFail, 
		{
			quality: 50,
			encodingType: Camera.EncodingType.PNG,
			destinationType: navigator.camera.DestinationType.FILE_URI
			// to access photo library add to the options following to indicate photo source
			//, sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		});
		loaded = true;
	}
}

function onPhotoLoadSuccess(photoUri) {
	// store current photo for saving later
	currentPhoto = photoUri;
	document.getElementById('photo').src = photoUri;
}

function onFail(message) {
	alert('Failed to laod photo because: ' + message);
}

function savePhoto() {
	if(currentPhoto == null) {
		alert("Please select a photo first");
		return;
	}
	var uploadOptions = new FileUploadOptions();
	uploadOptions.fileKey = "file"; // server-side variable name
	uploadOptions.fileName = currentPhoto.substr(currentPhoto.lastIndexOf('/')+1); // photo file
	uploadOptions.mimeType = "image/png"; // photo file type

	var fileTransfer = new FileTransfer();
	// Be sure to update the URL below to your site
	fileTransfer.upload(currentPhoto, "http://www.webistrate.com/phonegap/upload.php", uploadSuccess, uploadFail, uploadOptions);
}

function uploadSuccess(result) {
	alert("Successfully transferred " + result.bytesSent + "bytes");
}

function uploadFail(error) {
	alert("Error uploading file: " + error.code);
}

