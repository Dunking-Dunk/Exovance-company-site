"use client"

import { Text3D, Center, Float, MeshTransmissionMaterial } from '@react-three/drei'

const Text = () => {

    return (
        <group>
            {/* Main text */}
            <Float
                speed={1} // Animation speed
                rotationIntensity={0.2} // XYZ rotation intensity
                floatIntensity={0.5} // Up/down float intensity
            >
                <Center>
                    <Text3D
        
                        font="/Inter_Bold.json"
                        size={0.5}
                        height={0.2}
                        curveSegments={32}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5} 
                    >
                        {"EXOVANCE"}
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.2}
                            chromaticAberration={1}
                            anisotropy={0.3}
                            distortion={0.5}
                            distortionScale={0.5}
                            temporalDistortion={0.1}
                            iridescence={1}
                            iridescenceIOR={1}
                            iridescenceThicknessRange={[0, 1400]}
                        />
                    </Text3D>
                </Center>
            </Float>
        
        </group>
    )
}

type Props = {
    className?: string
}

const CompanyName3D = ({ className }: Props) => {
    return (
         <group position={[0,0,1]}>
            <Text />
         </group>
    )
}

export default CompanyName3D
