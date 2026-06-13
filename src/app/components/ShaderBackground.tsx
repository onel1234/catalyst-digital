"use client";

import React, { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;

varying vec2 v_texCoord;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Catalyst Brand Palette
// Ink Black: #0D1117 (vec3(0.05, 0.067, 0.09))
// Electric Indigo: #6A28FF (vec3(0.416, 0.157, 1.0))
// Strong Cyan: #00D1CD (vec3(0.0, 0.82, 0.804))

vec3 hash(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(dot(hash(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                       dot(hash(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
                   mix(mix(dot(hash(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                           dot(hash(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x), u.y),
               mix(mix(mix(dot(hash(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                           dot(hash(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
                       mix(mix(dot(hash(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                               dot(hash(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x), u.y), u.z));
}

void main() {
    vec2 uv = v_texCoord;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= aspect;

    // Movement speeds
    float time = u_time * 0.15;
    
    // Create soft, shifting "glass" noise layers
    float n1 = noise(vec3(p * 0.8, time * 0.5));
    float n2 = noise(vec3(p * 1.5 + n1 * 0.5, time * 0.8));
    
    // Background color (Ink Black)
    vec3 bg = vec3(0.05, 0.067, 0.09);
    
    // Glow colors
    vec3 indigo = vec3(0.416, 0.157, 1.0);
    vec3 cyan = vec3(0.0, 0.82, 0.804);
    
    // Create animated glow positions
    vec2 indigoPos = vec2(sin(time * 0.7), cos(time * 0.5)) * 0.8;
    vec2 cyanPos = vec2(cos(time * 0.4), sin(time * 0.6)) * 0.8;
    
    // Influence of glows based on distance and noise
    float indigoGlow = smoothstep(1.5, 0.0, length(p - indigoPos)) * (0.4 + 0.2 * n1);
    float cyanGlow = smoothstep(1.5, 0.0, length(p - cyanPos)) * (0.3 + 0.2 * n2);
    
    // Blend colors
    vec3 finalColor = bg;
    finalColor = mix(finalColor, indigo, indigoGlow);
    finalColor = mix(finalColor, cyan, cyanGlow);
    
    // Add subtle brightness variations (frosted glass feel)
    finalColor += n1 * 0.02;
    
    // Vignette for depth
    float vignette = smoothstep(2.5, 0.5, length(p));
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    const vShader = cs(gl.VERTEX_SHADER, vs);
    const fShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!prog || !vShader || !fShader) return;

    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
