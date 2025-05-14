function createCubeArmature(height,width,depth,color) { // Create a cube armature (segments only)

	const geometry = new THREE.BoxGeometry(height, width, depth);
	const edges = new THREE.EdgesGeometry(geometry);
	return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: color }));
	
}

function createLine(p1,p2,color) { // Create a line from two points
	
	const line = new THREE.BufferGeometry().setFromPoints([p1,p2]);
	return new THREE.LineSegments(line, new THREE.LineBasicMaterial({ color: color }));
	
}