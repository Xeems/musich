import { Canvas } from '@react-three/fiber'
import ShaderPlane from './ShaderPlane'

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                gl={{ alpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0, 0)
                }}>
                <ShaderPlane />
            </Canvas>
        </div>
    )
}
