import React, { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 p = (uv - 0.5) * 2.0;
    
    // Background color
    vec3 color = vec3(0.08, 0.125, 0.168);
    
    // Simple animated triangle
    float angle = iTime * 0.5;
    vec2 a = vec2(cos(angle), sin(angle)) * 0.5;
    vec2 b = vec2(cos(angle + 2.094), sin(angle + 2.094)) * 0.5;
    vec2 c = vec2(cos(angle + 4.189), sin(angle + 4.189)) * 0.5;
    
    // Add motion to vertices
    a += vec2(sin(iTime * 2.0) * 0.1, cos(iTime * 1.5) * 0.1);
    b += vec2(cos(iTime * 1.8) * 0.1, sin(iTime * 2.1) * 0.1);
    c += vec2(sin(iTime * 1.6) * 0.1, cos(iTime * 2.3) * 0.1);
    
    // Simple triangle test using barycentric coordinates
    vec2 v0 = c - a;
    vec2 v1 = b - a;
    vec2 v2 = p - a;
    
    float d00 = dot(v0, v0);
    float d01 = dot(v0, v1);
    float d02 = dot(v0, v2);
    float d11 = dot(v1, v1);
    float d12 = dot(v1, v2);
    
    float invDenom = 1.0 / (d00 * d11 - d01 * d01);
    float u = (d11 * d02 - d01 * d12) * invDenom;
    float v = (d00 * d12 - d01 * d02) * invDenom;
    
    // Check if point is inside triangle
    if (u >= 0.0 && v >= 0.0 && u + v <= 1.0) {
        color += vec3(0.2, 0.3, 0.4);
    }
    
    // Add some noise
    color += fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create and compile vertex shader
    const vShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vShader) return;
    
    gl.shaderSource(vShader, vertexShader);
    gl.compileShader(vShader);
    
    if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vShader));
      return;
    }

    // Create and compile fragment shader
    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fShader) return;
    
    gl.shaderSource(fShader, fragmentShader);
    gl.compileShader(fShader);
    
    if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fShader));
      return;
    }

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);

    // Create vertex buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');

    let startTime = Date.now();
    
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      
      // Update canvas size
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      
      // Set uniforms
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, width, height);
      
      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};
