const vertexShaderText = [
  "precision mediump float;",
  "",
  "attribute vec2 vertPosition;",
  "attribute vec3 vertColor;",
  "varying vec3 fragColor;",
  "",
  "void main()",
  "{",
  "fragColor = vertColor;",
  " gl_Position = vec4(vertPosition, 0.0, 1.0);",
  "}",
].join("\n");

const fragmentShaderText = [
  "precision mediump float;",
  "",
  "varying vec3 fragColor;",
  "void main()",
  "{",
  " gl_FragColor = vec4(fragColor, 1.0);",
  "}",
].join("\n");

/** @param {WebGLRenderingContext} ctx */
export const app3d = (ctx) => {
  ctx.clearColor(0.1, 0.1, 0.1, 1);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

  // create shaders

  const vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
  const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);

  ctx.shaderSource(vertexShader, vertexShaderText);
  ctx.shaderSource(fragmentShader, fragmentShaderText);

  ctx.compileShader(vertexShader);
  if (!ctx.getShaderParameter(vertexShader, ctx.COMPILE_STATUS)) {
    console.error("error, compiling vertes shadder", ctx.getShaderInfoLog(vertexShader));
    return;
  }

  ctx.compileShader(fragmentShader);
  if (!ctx.getShaderParameter(fragmentShader, ctx.COMPILE_STATUS)) {
    console.error("error, compiling fragment shadder", ctx.getShaderInfoLog(fragmentShader));
    return;
  }

  const program = ctx.createProgram();
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);
  ctx.linkProgram(program);
  if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    console.error("Error linking", ctx.getProgramInfoLog(program));
    return;
  }

  ctx.validateProgram(program);
  if (!ctx.getProgramParameter(program, ctx.VALIDATE_STATUS)) {
    console.error("Error validating program", ctx.getProgramInfoLog(program));
  }
  /**
   * create buffer
   */
  const triangleVertices = [
    0.0, 0.5, 1.0, 1.0, 0.0,
    -0.5, -0.5, 0.7, 0.5, 0.5,
    0.5, -0.5, 0.8, 0.2, 0.3
  ];

  const triangleVertexBufferObject = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, triangleVertexBufferObject);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(triangleVertices), ctx.STATIC_DRAW);

  const positionAttribLocation = ctx.getAttribLocation(program, "vertPosition");
  const colorAttribLocation = ctx.getAttribLocation(program, "vertColor");
  ctx.vertexAttribPointer(positionAttribLocation, 2, ctx.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
  ctx.vertexAttribPointer(colorAttribLocation, 3, ctx.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

  ctx.enableVertexAttribArray(positionAttribLocation);
  ctx.enableVertexAttribArray(colorAttribLocation);

  /**
   * Main render loop
   */

  ctx.useProgram(program);
  ctx.drawArrays(ctx.TRIANGLES, 0, 3);
};
