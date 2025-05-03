import React, { useEffect, useRef, useState } from 'react';

const vertexShader = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0, 1);
}
`;

// Your original shader
const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

void mainImage( out vec4 o, vec2 u )
{
    vec2 v = iResolution.xy;
         u = .2*(u+u-v)/v.y;    
         
    vec4 z = o = vec4(1,2,3,0);
     
    float i = 0.0;
    for (float a = .5, t = iTime; 
         ++i < 19.; 
         o += (1. + cos(z+t)) 
            / length((1.+i*dot(v,v)) 
                   * sin(1.5*u/(.5-dot(u,u)) - 9.*u.yx + t))
         )  
        v = cos(++t - 7.*u*pow(a += .03, i)) - 5.*u,                 
        u += tanh(40. * dot(u *= mat2(cos(i + .02*t - vec4(0,11,33,0)))
                           ,u)
                      * cos(1e2*u.yx + t)) / 2e2
           + .2 * a * u
           + cos(4./exp(dot(o,o)/1e2) + t) / 3e2;
              
     o = 25.6 / (min(o, 13.) + 164. / o) 
       - dot(u, u) / 250.;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

// Fallback shader in case the complex one fails
const fallbackFragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);
}
`;

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try to get WebGL context with various options
    let gl = canvas.getContext('webgl2');
    if (!gl) {
      gl = canvas.getContext('webgl');
    }
    if (!gl) {
      gl = canvas.getContext('experimental-webgl');
    }
    
    if (!gl) {
      setError('WebGL not supported');
      return;
    }

    let currentFragmentShader = fragmentShader;
    let retryWithFallback = false;

    const createShaderProgram = () => {
      // Create shaders
      const vertShader = gl!.createShader(gl!.VERTEX_SHADER);
      const fragShader = gl!.createShader(gl!.FRAGMENT_SHADER);

      if (!vertShader || !fragShader) {
        setError('Failed to create shaders');
        return null;
      }

      gl!.shaderSource(vertShader, vertexShader);
      gl!.compileShader(vertShader);

      if (!gl!.getShaderParameter(vertShader, gl!.COMPILE_STATUS)) {
        setError('Vertex shader compilation error: ' + gl!.getShaderInfoLog(vertShader));
        return null;
      }

      gl!.shaderSource(fragShader, currentFragmentShader);
      gl!.compileShader(fragShader);

      if (!gl!.getShaderParameter(fragShader, gl!.COMPILE_STATUS)) {
        console.warn('Fragment shader compilation error:', gl!.getShaderInfoLog(fragShader));
        if (!retryWithFallback) {
          retryWithFallback = true;
          currentFragmentShader = fallbackFragmentShader;
          gl!.deleteShader(vertShader);
          gl!.deleteShader(fragShader);
          return createShaderProgram(); // Retry with fallback shader
        }
        return null;
      }

      // Create program
      const program = gl!.createProgram();
      if (!program) {
        setError('Failed to create program');
        return null;
      }

      gl!.attachShader(program, vertShader);
      gl!.attachShader(program, fragShader);
      gl!.linkProgram(program);

      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        setError('Program linking error: ' + gl!.getProgramInfoLog(program));
        return null;
      }

      return { program, vertShader, fragShader };
    };

    const shaderProgram = createShaderProgram();
    if (!shaderProgram) return;

    const { program, vertShader, fragShader } = shaderProgram;

    gl.useProgram(program);

    // Create vertices for a full-screen quad
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

    // Handle resize
    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl!.viewport(0, 0, width, height);
      }
    };

    // Initial resize
    resize();

    // Render loop
    const render = () => {
      if (!gl) return;

      resize();
      
      const time = (Date.now() - startTimeRef.current) / 1000;
      
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    };

    // Start render loop
    render();

    // Handle window resize
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(buffer);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900" style={{ zIndex: -1 }}>
        {/* Fallback gradient background */}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
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
