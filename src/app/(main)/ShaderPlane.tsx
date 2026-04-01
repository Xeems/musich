'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float hash(vec2 p) {
    return fract(sin(dot(p, vec2(0.650,-0.310))) * 57.593);
}

// Плавный шум (Value Noise)
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); // Плавная кривая (Hermite interpolation)

    return mix(mix(hash(i + vec2(0.000,-0.00)), 
                   hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), 
                   hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 2; i++) {
        val += amp * noise(p);
        p *= 2.0;     // увеличиваем частоту
        amp *= 0.5;   // уменьшаем вклад
    }
    return val;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    
	vec2 p = st * vec2(5.0, 2.0);;

    vec2 q = vec2(
        fbm(p + vec2(-0.010,0.010)+ u_time * .5),
        fbm(p + vec2(0.020,-0.020)+ u_time * .5)
    );


    vec2 r = vec2(
        fbm(p + 1. * q + vec2(-0.630,0.540) ),
        fbm(p + 1. * q + vec2(-0.140,-0.040) )
    );

    
	float h = fbm(p + 0.500 * r + u_time * 0.15);
    
    float ellipse = length((st - 1.164) * vec2(-0.120,0.480));
	h *= 1.0 - ellipse;

    float levels = 9.; 
  	float v = h * levels;
	float f = fract(v);
    float stepped_h = floor(h * levels) * levels;

	float fw = fwidth(v); // ширина линии в пикселях (адаптивная)

	float line = smoothstep(.000, fw, f) - smoothstep(1.0 - fw, 1.0, f); 	// делаем линию одинаковой толщины

    float alpha = 1. - line;

	vec3 lineColor = vec3(1.0, 0.6, 0.0);

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
                extensions={{ derivatives: true }}
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
