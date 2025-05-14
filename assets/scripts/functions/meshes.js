function createCubeArmature(height,width,depth,color) { // Create a cube armature (segments only)

	return new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(height, width, depth)), new THREE.LineBasicMaterial({ color: color }));
	
}

function createLine(p1,p2,color) { // Create a line from two points
	
	return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([p1,p2]), new THREE.LineBasicMaterial({ color: color }));
	
}