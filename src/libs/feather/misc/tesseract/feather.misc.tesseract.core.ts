import { initShaderProgram } from '@feather/webgl/feather.webgl.shaders.core';
import { VBO, initBufferFromArray } from '@feather/webgl/feather.webgl.buffers.core';
import { mat4 } from 'gl-matrix';
import { parseOBJ } from '@feather/webgl/importer/feather.webgl.importer.obj';
import * as FeatherTypes from '@feather/feather.types';
import { Mesh, HyperMesh } from '@feather/webgl/feather.webgl.mesh.core';
import { parseHOBJ } from '@feather/webgl/importer/feather.webgl.importer.hobj';

function loadTexture(gl : WebGLRenderingContext, url : string) : WebGLTexture {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Du fait que les images doivent être téléchargées depuis l'internet,
  // il peut s'écouler un certain temps avant qu'elles ne soient prêtes.
  // Jusque là, mettre un seul pixel dans la texture, de sorte que nous puissions
  // l'utiliser immédiatement. Quand le téléchargement de la page sera terminé,
  // nous mettrons à jour la texture avec le contenu de l'image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // bleu opaque
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image,
    );

    // WebGL1 a des spécifications différentes pour les images puissances de 2
    // par rapport aux images non puissances de 2 ; aussi vérifier si l'image est une
    // puissance de 2 sur chacune de ses dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Oui, c'est une puissance de 2. Générer les mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // Non, ce n'est pas une puissance de 2. Désactiver les mips et définir l'habillage
      // comme "accrocher au bord"
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value : number) : boolean {
  return (value & (value - 1)) == 0;
}


let texture : WebGLTexture | null = null;


export async function loadOBJ(gl : WebGLRenderingContext, buffers : VBO, objData : string) : Promise<void> {
  // Load the OBJ file

  const object : Mesh = parseOBJ(objData);

  const vertices : Array<number> = [];
  const normals : Array<number> = [];
  const uvs : Array<number> = [];
  const barycentric : Array<number> = [];

  console.log('Vertices:', object.vertices);
  console.log('Normals:', object.normals);
  console.log('UVs:', object.uvs);
  console.log('Faces:', object.faces);

  object.faces.forEach((face) => {
    if (object.vertices[face[0][0]]) vertices.push(... object.vertices[face[0][0]]);
    if (object.vertices[face[1][0]]) vertices.push(... object.vertices[face[1][0]]);
    if (object.vertices[face[2][0]]) vertices.push(... object.vertices[face[2][0]]);
    
    if (object.uvs[face[0][1]]) uvs.push(... object.uvs[face[0][1]]);
    if (object.uvs[face[1][1]]) uvs.push(... object.uvs[face[1][1]]);
    if (object.uvs[face[2][1]]) uvs.push(... object.uvs[face[2][1]]);

    if (object.normals[face[0][2]]) normals.push(... object.normals[face[0][2]]);
    if (object.normals[face[1][2]]) normals.push(... object.normals[face[1][2]]);
    if (object.normals[face[2][2]]) normals.push(... object.normals[face[2][2]]);

    if (object.barycentric[face[0][3]]) barycentric.push(... object.barycentric[face[0][3]]);
    if (object.barycentric[face[1][3]]) barycentric.push(... object.barycentric[face[1][3]]);
    if (object.barycentric[face[2][3]]) barycentric.push(... object.barycentric[face[2][3]]);
  });

  console.log('Vertices:', vertices);
  console.log('Normals:', normals);
  console.log('UVs:', uvs);
  console.log('Barycentric:', barycentric);

  buffers.position = initBufferFromArray(gl, vertices);
  buffers.normal = initBufferFromArray(gl, normals);
  buffers.uv = initBufferFromArray(gl, uvs);
  buffers.barycentric = initBufferFromArray(gl, barycentric);
  buffers.count = vertices.length / 3;
}


export async function loadHOBJ(gl : WebGLRenderingContext, buffers : VBO, objData : string) : Promise<void> {
  // Load the OBJ file

  const object : HyperMesh = parseHOBJ(objData);

  const vertices : Array<number> = [];
  const normals : Array<number> = [];
  const uvs : Array<number> = [];
  const barycentric : Array<number> = [];

  console.log('Vertices:', object.vertices);
  console.log('Normals:', object.normals);
  console.log('UVs:', object.uvs);
  console.log('Faces:', object.faces);

  object.faces.forEach((face) => {
    if (object.vertices[face[0][0]]) vertices.push(... object.vertices[face[0][0]]);
    if (object.vertices[face[1][0]]) vertices.push(... object.vertices[face[1][0]]);
    if (object.vertices[face[2][0]]) vertices.push(... object.vertices[face[2][0]]);
    
    if (object.uvs[face[0][1]]) uvs.push(... object.uvs[face[0][1]]);
    if (object.uvs[face[1][1]]) uvs.push(... object.uvs[face[1][1]]);
    if (object.uvs[face[2][1]]) uvs.push(... object.uvs[face[2][1]]);

    if (object.normals[face[0][2]]) normals.push(... object.normals[face[0][2]]);
    if (object.normals[face[1][2]]) normals.push(... object.normals[face[1][2]]);
    if (object.normals[face[2][2]]) normals.push(... object.normals[face[2][2]]);

    if (object.barycentric[face[0][3]]) barycentric.push(... object.barycentric[face[0][3]]);
    if (object.barycentric[face[1][3]]) barycentric.push(... object.barycentric[face[1][3]]);
    if (object.barycentric[face[2][3]]) barycentric.push(... object.barycentric[face[2][3]]);
  });

  console.log('Vertices:', vertices);
  console.log('Normals:', normals);
  console.log('UVs:', uvs);
  console.log('Barycentric:', barycentric);

  buffers.position = initBufferFromArray(gl, vertices);
  buffers.normal = initBufferFromArray(gl, normals);
  buffers.uv = initBufferFromArray(gl, uvs);
  buffers.barycentric = initBufferFromArray(gl, barycentric);
  buffers.count = vertices.length / 4;
}