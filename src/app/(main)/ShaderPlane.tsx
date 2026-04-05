'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


vec3 hash33(vec3 p) 
{
    p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
              dot(p,vec3(269.5,183.3,246.1)),
              dot(p,vec3(113.5,271.9,124.6)));

    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(vec2 o) { //Perlin(ish) Noise Function adapted from Stefan Gustavson's 'Simplex Noise Demystified' (Math)
    vec3 p = vec3(o.x + 0.08*u_time, o.y + 0.05*u_time,0.01*u_time);
    vec3 i = floor(p + dot(p, vec3(0.33333,0.33333,0.33333)));
    p -= i - dot(i, vec3(0.16666,0.16666,0.16666));
    vec3 i1 = step(p.yzx, p);
    vec3 i2 = max(i1, 1.0-i1.zxy);
    i1 = min(i1, 1.0-i1.zxy);
    vec3 p1 = p - i1 + 0.16666, p2 = p - i2 + 0.33333, p3 = p - 0.5;
    vec4 v = max(0.5 - vec4(dot(p,p), dot(p1,p1), dot(p2,p2), dot(p3,p3)), 0.0);
    vec4 d = vec4(dot(p, hash33(i)), dot(p1, hash33(i + i1)), dot(p2, hash33(i + i2)), dot(p3, hash33(i + 1.0)));
    float n = clamp(dot(d,v*v*v*8.)*1.732 + 0.5, 0., 1.);
    return n;
}


float fbm(vec2 p) {
    float val = 2.0;
    float amp = 1.164;
    for (int i = 0; i < 10; i++) {
        val += amp * noise(p);
        p *= 2.144;
        amp *= 0.124;
    }
    return val;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    vec2 p = uv * vec2(3.5, 2.);

	float h = fbm(p * 0.792 + u_time * 0.0004);
   
    float levels = 8.572; 
  	float v = h * levels;
	float f = fract(v);
    float stepped_h = floor(h * levels) * levels;

	float fw = fwidth(v); 

	float line = smoothstep(.000, fw, f) - smoothstep(1.0 - fw, 1.0, f); 	// делаем линию одинаковой толщины

    float alpha = 1. - line;

	vec3 lineColor = vec3(0.975,0.508,0.040);

	gl_FragColor = vec4(lineColor, alpha);
}
`

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`

export default function ShaderPlane() {
    const materialRef = useRef<any>(null)

    useFrame((state) => {
        materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
    })

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    u_time: { value: 0 },
                    u_resolution: {
                        value: new THREE.Vector2(
                            window.innerWidth,
                            window.innerHeight,
                        ),
                    },
                }}
                transparent={true}
                depthWrite={false}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    )
}
