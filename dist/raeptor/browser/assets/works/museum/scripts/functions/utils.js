loadScript = function(url) { // Load a script
	url = "scripts/"+url+".js";
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.defer = true;
    script._url = url;
    document.body.appendChild(script);
};

cameraReset = function() {
	
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Define camera perspective
	camera.position.z = 3; // Define camera position
	
}

getDistance = function(p1,p2) {
	
	return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)) 
	
}

easeInSine = function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

openWindowWithPost = function (url, data) {
    var form = document.createElement("form");
    form.target = "_self";
    form.method = "GET";
    form.action = url;
    form.style.display = "none";

    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}