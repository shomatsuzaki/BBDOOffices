$(document).ready(function() {
	//check for mobile and tablet, serve splash page if present
	if (window.mobileAndTabletcheck) {
		document.getElementById('container').style.display = 'none';
		document.getElementById('mobilesplash').style.display = 'block';
	}

	//main visible canvas settings
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	//hidden canvas rendering the full signature with subheader
	var signature = document.getElementById('signature');
	var cxt = signature.getContext('2d');
	cxt.font = '100 22px Arial';
	cxt.textAlign = 'start';
	
	//address entered
	var officeName = '';
	var dataURL = '';

	//bbdo color logo
	var logo = document.getElementById('bbdo');

	//when user taps enter, click the go button
	$(document).keyup(function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
	    	event.preventDefault();
			// Trigger the button element with a click
			$('#go').click();
		}
	});

	//create the logo after clicking go button
	$('#go').click(function() {
		var officeform = document.getElementById('officeform');
		if (officeform.value == "") {
			;
		} else {
			/////////////////////////
			//THE MAGIC HAPPENS HERE
			/////////////////////////
			officeName = officeform.value.toUpperCase();
			//three options for office name sizes
			if (officeName.length < 11) {
				//Update the visible canvas
				context.font = '226px GothamBlack';
				context.textAlign = 'start';
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.fillText(officeName, 590, 180);
				context.drawImage(logo, 0, 20, 550, 158);
				
				//Update the invisible canvas (what is actually being downloaded)
				cxt.fillStyle = '#ef4023';
				cxt.fillRect(0, 91, 560, 25);
				cxt.fillStyle = '#FFFFFF';
				cxt.fillText('We are all at BBDO NY, wherever we are. Stay safe.', 0, 110);
				cxt.drawImage(canvas, 0, -8, 1160, 100);
			} else if (officeName.length < 18) {
				context.font = '160px GothamBlack';
				context.textAlign = 'start';
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.fillText(officeName, 450, 155);
				context.drawImage(logo, 0, 40, 400, 115);

				cxt.fillStyle = '#ef4023';
				cxt.fillRect(0, 80, 560, 25);
				cxt.fillStyle = '#FFFFFF';
				cxt.fillText('We are all at BBDO NY, wherever we are. Stay safe.', 0, 100);
				cxt.drawImage(canvas, 0, 0, 928, 80);
			} else {
				context.font = '100px GothamBlack';
				context.textAlign = 'start';
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.fillText(officeName, 290, 142);
				context.drawImage(logo, 0, 70, 250, 72);

				cxt.fillStyle = '#ef4023';
				cxt.fillRect(0, 75, 560, 25);
				cxt.fillStyle = '#FFFFFF';
				cxt.fillText('We are all at BBDO NY, wherever we are. Stay safe.', 0, 95);
				cxt.drawImage(canvas, 0, -7, 1044, 90);
			}
			//Convert canvas to visible image
			// dataURL = canvas.toDataURL("image/png;base64");
			// img.src = dataURL;
			// img.style.display = 'block';

			//Move to the next part of the site to display the new logo
			document.getElementById('gradient').style.display = 'none';
			document.getElementById('open').style.display = 'none';
			document.getElementById('result').style.display = 'block';
			////////////////////////////
			////////////////////////////
		}
	});

	//scroll down to the instructions before downloading the PNG
	$('#btndownload').click(function() {
		var instructions = document.getElementById('instructions');
		downloadlogo(signature, instructions, 'bbdo-logo.png');
	});
});

////////////////////////
// Final download function
////////////////////////

function downloadlogo(canvas, instructions, filename) {
	instructions.style.display = 'block';
	location.href = "#";
	location.href = "#instructions";
	//delay to allow for scroll
	setTimeout(function() {
		download(canvas, filename);
	}, 800); 
}

////////////////////////
// Gradient background
////////////////////////

var colors = new Array(
[62,35,255],
[60,255,60],
[255,35,98],
[45,175,230],
[255,0,255],
[255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {
	if ( $===undefined ) return;
  
	var c0_0 = colors[colorIndices[0]];
	var c0_1 = colors[colorIndices[1]];
	var c1_0 = colors[colorIndices[2]];
	var c1_1 = colors[colorIndices[3]];

	var istep = 1 - step;
	var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
	var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
	var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
	var color1 = "rgb("+r1+","+g1+","+b1+")";

	var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
	var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
	var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
	var color2 = "rgb("+r2+","+g2+","+b2+")";

	$('#gradient').css({
		background: "-webkit-linear-gradient(150deg, "+color1+" 0%, "+color2+" 100%)"})
		.css({background: "-moz-linear-gradient(150deg, "+color1+" 0%, "+color2+" 100%)"})
		.css({background: "linear-gradient(150deg, "+color1+" 0%, "+color2+" 100%)"});
  
	step += gradientSpeed;
	if ( step >= 1 ) {
	    step %= 1;
	    colorIndices[0] = colorIndices[1];
	    colorIndices[2] = colorIndices[3];
	    
	    //pick two new target color indices
	    //do not pick the same as the current one
	    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	}
}

setInterval(updateGradient,10);


////////////////////////
// Check for mobile
////////////////////////

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}();


////////////////////////
// Download PNG from canvas
////////////////////////

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