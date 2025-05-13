export interface VBO {
  position?: WebGLBuffer | null;
  normal?: WebGLBuffer | null;
  barycentric?: WebGLBuffer | null;
  uv?: WebGLBuffer | null;
  [key: string]: WebGLBuffer | null | undefined;
  count: number;
}

export function initBufferFromArray(gl : WebGLRenderingContext, data : Array<number>) : WebGLBuffer {
  // Create a buffer for the square's positions.
  const buffer : WebGLBuffer = gl.createBuffer();
  if (!buffer) {
    throw new Error("Failed to create buffer");
  }

  // Select the buffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
}