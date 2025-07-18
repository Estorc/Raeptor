export function initShaderProgram(gl : WebGLRenderingContext, vsSource : string, fsSource : string) : WebGLProgram | null {
  const vertexShader : WebGLShader | null = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader : WebGLShader | null = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) {
    alert("Unable to initialize shaders.");
    return null;
  }

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
    return null;
  }

  return shaderProgram;
}


export function loadShader(gl : WebGLRenderingContext, type : number, source : string) : WebGLShader | null {
  const shader : WebGLShader | null = gl.createShader(type);

  if (!shader) {
    alert("Unable to create shader.");
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}