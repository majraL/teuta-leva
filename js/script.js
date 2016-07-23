/*
var polje = [ "slika (1).jpg", "slika (1).png", "slika (2).jpg", "slika (2).png", 
			"slika (3).jpg", "slika (4).jpg", "slika (5).gif" ];

for (var i=0; i<polje.length; i++){
	console.log(polje[i]);
}
*/
$(function(){
	$(".gridster ul").gridster({
		widget_margins: [10,10],
		widget_base_dimensions: [250,150]
	});
});

$(function(){ //DOM Ready

  	var gridster = $(".gridster ul").gridster().data('gridster');
	
	gridster.add_widget('<li class="red"></li>', 3, 1, 1, 3);
	
	gridster.serialize();
	console.log();

});

function drop(event) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log("wuhu");
		}
  	};
  xhttp.open("GET", "test.txt", true);
  xhttp.send();
    /*event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));*/
    //document.getElementById("demo").innerHTML = "The p element was dropped";
	//loadDoc();
}

function loadDoc() {
  
}

window.onload = function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log("wuhu");
		}
  	};
	  xhttp.open("GET", "test.txt", true);
	  xhttp.send();
	/*
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      gridster.$widgets[0].innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "http://www.w3schools.com/ajax/ajax_info.txt", true);
  xhttp.send();*/
}