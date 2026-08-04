'use client';

import React, { useEffect, useRef } from 'react';

export default function SandFluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Resize canvas to fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ==========================================
    // VERTEX SHADER
    // ==========================================
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // ==========================================
    // FRAGMENT SHADER (The "Liquid Sand" Magic)
    // ==========================================
    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;

      // Smooth noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;

        // Slow down time for a luxurious, cinematic drift
        float t = u_time * 0.15;

        // Create layered noise coordinates
        vec2 pos = uv * 1.5;
        float noise1 = snoise(pos + t);
        float noise2 = snoise(pos - t * 0.8 + noise1 * 0.5);
        float noise3 = snoise(pos + vec2(sin(t), cos(t)) + noise2 * 0.8);

        // Map noise to a 0.0 - 1.0 range
        float n = (noise3 + 1.0) * 0.5;

        // BRAND COLORS (Normalized RGB 0-1)
        // Bone / Light Sand (#F5F0E8)
        vec3 colorBone = vec3(0.96, 0.94, 0.91);

        // Warm Sand / Mocha (#E0D2BC)
        vec3 colorSand = vec3(0.88, 0.82, 0.74);

        // Clay / Brown (#B87D6B)
        vec3 colorClay = vec3(0.72, 0.49, 0.42);

        // Mix the colors based on the organic noise values
        vec3 finalColor = mix(colorBone, colorSand, smoothstep(0.1, 0.6, n));
        finalColor = mix(finalColor, colorClay, smoothstep(0.6, 1.0, n));

        // Add a very subtle grain/dither to prevent banding
        float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;

        gl_FragColor = vec4(finalColor + grain, 1.0);
      }
    `;

    // Compile Shader helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup geometry (a single large rectangle covering the screen)
    const positionLocation = gl.getAttribLocation(program, 'position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    let animationFrameId: number;
    const startTime = performance.now();

    // Render loop
    const render = (time: number) => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (time - startTime) * 0.001); // Pass seconds to shader

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render(startTime);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 object-cover"
      style={{ pointerEvents: 'none' }}
    />
  );
}
