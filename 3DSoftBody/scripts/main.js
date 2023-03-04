
// Declare main variables

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;
const clock = new THREE.Clock();
controls = new THREE.OrbitControls( camera, renderer.domElement );


// Physics variables
const gravityConstant = - 9.8;
let physicsWorld;
const rigidBodies = [];
const softBodies = [];
const margin = 0.05;
let transformAux1;
let softBodyHelpers;
const pos = new THREE.Vector3();
const quat = new THREE.Quaternion();



function init() { // Initializing the scene
	
	controls.update();
	initPhysics();

	renderer.setSize(window.innerWidth,window.innerHeight ); // Make Three.js Canvas take all window
	document.body.appendChild( renderer.domElement ); // Add Three.js Canvas to the html <body>
	
	scene.add(createCubeArmature(10,10,10,0xffffff))

	quat.set( 0, 0, 0, 1 );
	let size = 10;
	let cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	let shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(0,1*size,0)
	createRigidBody( cube, shape, 0, pos, quat );
	
	
	cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(0,-1*size,0)
	createRigidBody( cube, shape, 0, pos, quat );
	
	cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(-1*size,0,0)
	createRigidBody( cube, shape, 0, pos, quat );
	
	cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(1*size,0,0)
	createRigidBody( cube, shape, 0, pos, quat );
	
	cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(0,0,-1*size)
	createRigidBody( cube, shape, 0, pos, quat );
	
	cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true , opacity: 0.0 } ) );
	shape = new Ammo.btBoxShape( new Ammo.btVector3( size*0.5, size*0.5, size*0.5 ) );
	pos.set(0,0,1*size)
	createRigidBody( cube, shape, 0, pos, quat );
	

	let volumeMass = 80;
	let geometry = new THREE.SphereGeometry(3, 40, 25);
	geometry.translate( 1, -4, 0 );
	createSoftVolume(geometry, volumeMass, 900);
	
	volumeMass = 20;
	geometry = new THREE.SphereGeometry(2, 40, 25);
	geometry.translate( 2, 1, 0 );
	createSoftVolume(geometry, volumeMass, 250);
	
	volumeMass = 1;
	geometry = new THREE.SphereGeometry(1, 20, 8);
	geometry.translate( 2, 4.5, 0.5 );
	createSoftVolume(geometry, volumeMass, 25);
	

	
}






function initPhysics() {

	// Physics configuration

	const collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
	const dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
	const broadphase = new Ammo.btDbvtBroadphase();
	const solver = new Ammo.btSequentialImpulseConstraintSolver();
	const softBodySolver = new Ammo.btDefaultSoftBodySolver();
	physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver );
	physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
	physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );

	transformAux1 = new Ammo.btTransform();
	softBodyHelpers = new Ammo.btSoftBodyHelpers();

}



function updatePhysics( deltaTime ) {

	// Step world
	physicsWorld.stepSimulation( deltaTime, 10 );

	// Update soft volumes
	for ( let i = 0, il = softBodies.length; i < il; i ++ ) {

		const volume = softBodies[ i ];
		const geometry = volume.geometry;
		const softBody = volume.userData.physicsBody;
		const volumePositions = geometry.attributes.position.array;
		const volumeNormals = geometry.attributes.normal.array;
		const association = geometry.ammoIndexAssociation;
		const numVerts = association.length;
		const nodes = softBody.get_m_nodes();
		for ( let j = 0; j < numVerts; j ++ ) {

			const node = nodes.at( j );
			const nodePos = node.get_m_x();
			const x = nodePos.x();
			const y = nodePos.y();
			const z = nodePos.z();
			const nodeNormal = node.get_m_n();
			const nx = nodeNormal.x();
			const ny = nodeNormal.y();
			const nz = nodeNormal.z();

			const assocVertex = association[ j ];

			for ( let k = 0, kl = assocVertex.length; k < kl; k ++ ) {

				let indexVertex = assocVertex[ k ];
				volumePositions[ indexVertex ] = x;
				volumeNormals[ indexVertex ] = nx;
				indexVertex ++;
				volumePositions[ indexVertex ] = y;
				volumeNormals[ indexVertex ] = ny;
				indexVertex ++;
				volumePositions[ indexVertex ] = z;
				volumeNormals[ indexVertex ] = nz;

			}

		}

		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.normal.needsUpdate = true;

	}
	
	// Update rigid bodies
	for ( let i = 0, il = rigidBodies.length; i < il; i ++ ) {

		const objThree = rigidBodies[ i ];
		const objPhys = objThree.userData.physicsBody;
		const ms = objPhys.getMotionState();
		if ( ms ) {

			ms.getWorldTransform( transformAux1 );
			const p = transformAux1.getOrigin();
			const q = transformAux1.getRotation();
			objThree.position.set( p.x(), p.y(), p.z() );
			objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

		}

	}

}


function processGeometry( bufGeometry ) {

	// Ony consider the position values when merging the vertices
	const posOnlyBufGeometry = new THREE.BufferGeometry();
	posOnlyBufGeometry.setAttribute( 'position', bufGeometry.getAttribute( 'position' ) );
	posOnlyBufGeometry.setIndex( bufGeometry.getIndex() );

	// Merge the vertices so the triangle soup is converted to indexed triangles
	const indexedBufferGeom = THREE.BufferGeometryUtils.mergeVertices( posOnlyBufGeometry );

	// Create index arrays mapping the indexed vertices to bufGeometry vertices
	mapIndices( bufGeometry, indexedBufferGeom );

}




function mapIndices( bufGeometry, indexedBufferGeom ) {

	// Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry

	const vertices = bufGeometry.attributes.position.array;
	const idxVertices = indexedBufferGeom.attributes.position.array;
	const indices = indexedBufferGeom.index.array;

	const numIdxVertices = idxVertices.length / 3;
	const numVertices = vertices.length / 3;

	bufGeometry.ammoVertices = idxVertices;
	bufGeometry.ammoIndices = indices;
	bufGeometry.ammoIndexAssociation = [];

	for ( let i = 0; i < numIdxVertices; i ++ ) {

		const association = [];
		bufGeometry.ammoIndexAssociation.push( association );

		const i3 = i * 3;

		for ( let j = 0; j < numVertices; j ++ ) {

			const j3 = j * 3;
			if ( isEqual( idxVertices[ i3 ], idxVertices[ i3 + 1 ], idxVertices[ i3 + 2 ],
				vertices[ j3 ], vertices[ j3 + 1 ], vertices[ j3 + 2 ] ) ) {

				association.push( j3 );

			}

		}

	}

}


function isEqual( x1, y1, z1, x2, y2, z2 ) {

	const delta = 0.000001;
	return Math.abs( x2 - x1 ) < delta &&
			Math.abs( y2 - y1 ) < delta &&
			Math.abs( z2 - z1 ) < delta;

}



function createSoftVolume( bufferGeom, mass, pressure ) {

	processGeometry( bufferGeom );

	const volume = new THREE.Mesh( bufferGeom, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	volume.castShadow = true;
	volume.receiveShadow = true;
	volume.frustumCulled = false;
	volume.material.wireframe = true;
	scene.add( volume );


	/*textureLoader.load( "textures/colors.png", function ( texture ) {

		volume.material.map = texture;
		volume.material.needsUpdate = true;

	} );*/

	// Volume physic object

	const volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
		physicsWorld.getWorldInfo(),
		bufferGeom.ammoVertices,
		bufferGeom.ammoIndices,
		bufferGeom.ammoIndices.length / 3,
		true );

	const sbConfig = volumeSoftBody.get_m_cfg();
	sbConfig.set_viterations( 40 );
	sbConfig.set_piterations( 40 );

	// Soft-soft and soft-rigid collisions
	sbConfig.set_collisions( 0x11 );

	// Friction
	sbConfig.set_kDF( 0.1 );
	// Damping
	sbConfig.set_kDP( 0.01 );
	// Pressure
	sbConfig.set_kPR( pressure );
	// Stiffness
	volumeSoftBody.get_m_materials().at( 0 ).set_m_kLST( 0.9 );
	volumeSoftBody.get_m_materials().at( 0 ).set_m_kAST( 0.9 );

	volumeSoftBody.setTotalMass( mass, false );
	Ammo.castObject( volumeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin );
	physicsWorld.addSoftBody( volumeSoftBody, 1, - 1 );
	volume.userData.physicsBody = volumeSoftBody;
	// Disable deactivation
	volumeSoftBody.setActivationState( 4 );

	softBodies.push( volume );

}


function createRigidBody( threeObject, physicsShape, mass, pos, quat ) {

	threeObject.position.copy( pos );
	threeObject.quaternion.copy( quat );

	const transform = new Ammo.btTransform();
	transform.setIdentity();
	transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	const motionState = new Ammo.btDefaultMotionState( transform );

	const localInertia = new Ammo.btVector3( 0, 0, 0 );
	physicsShape.calculateLocalInertia( mass, localInertia );

	const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
	const body = new Ammo.btRigidBody( rbInfo );

	threeObject.userData.physicsBody = body;

	scene.add( threeObject );

	if ( mass > 0 ) {

		rigidBodies.push( threeObject );

		// Disable deactivation
		body.setActivationState( 4 );

	}

	physicsWorld.addRigidBody( body );

	return body;

}


function loopBegin() { // Executed at the begin of each frames
	
	requestAnimationFrame(animate);
	
}

function loopStep() { // Executed each frames
	
	for (let i=0;i<scene.children.length;i++) {
		
		if (scene.children[i].action) {
			scene.children[i] = scene.children[i].action(scene.children[i]);
		}
		
	};
	
	scene.children = scene.children.filter(item => item != null);
	
	const deltaTime = clock.getDelta();

	updatePhysics( deltaTime );
	
}

function loopEnd() { // Executed at the end of each frames
	
	renderer.render(scene, camera);
	
}


function animate() { // The main loop

	loopBegin();
	loopStep();
	loopEnd();

};



Ammo().then( function ( AmmoLib ) {

	Ammo = AmmoLib;

	init();
	animate();

} );

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()