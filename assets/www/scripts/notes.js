var file_writer;

function onNotesLoad() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSComplete, fail);
}

function onFSComplete(fileSystem) {
	// Load the notes.txt file, create it if it doesn't exist
	fileSystem.root.getFile("notes.txt", {create: true}, onFileEntryComplete, fail);
}

function onFileEntryComplete(fileEntry) {
	// read the file to pre-load content
	fileEntry.file(onFileReadComplete, fail);

	// set up the fileWriter
	fileEntry.createWriter(onFileWriterComplete, fail);
}

function onFileReadComplete(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		// load it into the form
		var form = document.getElementsByTagName('form')[0].elements;
		form.notes.value = evt.target.result;
	};
	reader.readAsText(file);
}

function onFileWriterComplete(fileWriter) {
	// store the fileWriter in a global variable so we have it when the users presses save
	file_writer = fileWriter;
}

function saveNotes() {
	// make sure the fileWriter is set
	if(file_writer != null) {
		// create an on complete write function that will redirect the user
		file_writer.onwrite = function(evt) {
			alert("Saved successfully");
			$.mobile.changePage("index.html");
		};

		var form = document.getElementsByTagName('form')[0].elements;
		var notes = form.notes.value;

		// save the notes
		file_writer.write(notes);
	}else {
		alert("There was an error trying to save the file");
	}
	return false;
}

function fail(error) {
	alert(error.code);
}

$(document).bind("pageload", onNotesLoad);