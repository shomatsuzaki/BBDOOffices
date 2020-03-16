$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var officeName = '';
	var img = document.getElementById('bbdo');

	let f = new FontFace('GothamUltra', 'url(./fonts/Gotham-Ultra.woff)');
	f.family = 'GothamUltra';
	f.load().then(function() {
		context.font = '230px GothamUltra';
		context.textAlign = 'start';

		$('#btnoffice').click(function() {
			officeName = document.getElementById('officeform').value.toUpperCase();
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillText(officeName, canvas.width/2, (canvas.height/2)+50);
			context.drawImage(img, 350, (canvas.height/2)-110);
		});

		$('#btndownload').click(function() {
			download(canvas, 'bbdo-logo.png');
		});

	});
});

// Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas

/* Canvas Download */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}