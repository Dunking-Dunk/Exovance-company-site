#define PI 3.1415926538
#define HALF_PI 1.5707963267948966
#define NOISE_SCALE 289.
#define NOISE_NORM 1.79284291400159
#define NOISE_NORM2.85373472095314
#define NOISE_OFFSET vec3(0.,19.1,33.4)
#define NOISE_OFFSET2 vec3(47.2,0.,0.)
#define MOUSE_INFLUENCE 2.
#define SPHERE_RADIUS 1.
#define TRANSITION_SPEED.1
#define MORPH_SPEED 5.
#define MORPH_PATTERNS 4.
#define INITIAL_RADIUS.8
#define MOUSE_RADIUS.4
#define SPRING_STRENGTH.005
#define SPRING_DAMPING.00001
#define RETURN_DELAY 200.
#define DISPLACEMENT_AMPLIFIER 5.
#define EASING_POWER.5
#define OSCILLATION_STRENGTH.15
#define OSCILLATION_FREQUENCY.8
#define ELASTIC_FACTOR 2.8
#define SLOW_MOTION_FACTOR.3

uniform sampler2D positionsA;
uniform sampler2D positionsB;
uniform sampler2D positionsC;
uniform sampler2D positionsD;
uniform sampler2D positionsE;
uniform float uTime;
uniform float uFrequency;
uniform vec3 uMouse;
uniform float uMouseRadius;
uniform float uScroll;
uniform float uTransitionProgress;
uniform float uRadiusScale;
uniform float uCurrentPosition;
uniform vec3 uPrevMouse;
uniform float uMouseActive;

varying vec2 vUv;

// Optimized noise functions with reduced calculations
vec4 permute(vec4 x){
    return mod(((x*34.)+1.)*x,NOISE_SCALE);
}

vec3 mod289(vec3 x){
    return x-floor(x*(1./NOISE_SCALE))*NOISE_SCALE;
}

vec4 mod289(vec4 x){
    return x-floor(x*(1./NOISE_SCALE))*NOISE_SCALE;
}

vec4 taylorInvSqrt(vec4 r){
    return NOISE_NORM-NOISE_NORM2*r;
}

// Optimized Simplex noise with reduced calculations
float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    
    i=mod289(i);
    vec4 p=permute(permute(permute(
                i.z+vec4(0.,i1.z,i2.z,1.))
                +i.y+vec4(0.,i1.y,i2.y,1.))
                +i.x+vec4(0.,i1.x,i2.x,1.));
                
                float n_=1./7.;
                vec3 ns=n_*D.wyz-D.xzx;
                
                vec4 j=p-49.*floor(p*ns.z*ns.z);
                vec4 x_=floor(j*ns.z);
                vec4 y_=floor(j-7.*x_);
                
                vec4 x=x_*ns.x+ns.yyyy;
                vec4 y=y_*ns.x+ns.yyyy;
                vec4 h=1.-abs(x)-abs(y);
                
                vec4 b0=vec4(x.xy,y.xy);
                vec4 b1=vec4(x.zw,y.zw);
                
                vec4 s0=floor(b0)*2.+1.;
                vec4 s1=floor(b1)*2.+1.;
                vec4 sh=-step(h,vec4(0.));
                
                vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                
                vec3 p0=vec3(a0.xy,h.x);
                vec3 p1=vec3(a0.zw,h.y);
                vec3 p2=vec3(a1.xy,h.z);
                vec3 p3=vec3(a1.zw,h.w);
                
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x;
                p1*=norm.y;
                p2*=norm.z;
                p3*=norm.w;
                
                vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
                m=m*m;
                return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
            }
            
            // Optimized curl noise with reduced calculations
            vec3 curlNoise(vec3 p){
                const float e=.1;
                vec3 dx=vec3(e,0.,0.);
                vec3 dy=vec3(0.,e,0.);
                vec3 dz=vec3(0.,0.,e);
                
                // Pre-calculate noise offsets
                vec3 offset1=p+NOISE_OFFSET;
                vec3 offset2=p+NOISE_OFFSET2;
                
                // Calculate noise values with reduced operations
                vec3 p_x0=vec3(snoise(p-dx),snoise(offset1-dx),snoise(offset2-dx));
                vec3 p_x1=vec3(snoise(p+dx),snoise(offset1+dx),snoise(offset2+dx));
                vec3 p_y0=vec3(snoise(p-dy),snoise(offset1-dy),snoise(offset2-dy));
                vec3 p_y1=vec3(snoise(p+dy),snoise(offset1+dy),snoise(offset2+dy));
                vec3 p_z0=vec3(snoise(p-dz),snoise(offset1-dz),snoise(offset2-dz));
                vec3 p_z1=vec3(snoise(p+dz),snoise(offset1+dz),snoise(offset2+dz));
                
                // Calculate curl components
                float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;
                float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;
                float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;
                
                return normalize(vec3(x,y,z)*5.);
            }
            
            // Elastic easing function for more bouncy returns
            float elasticEaseOut(float t){
                float p=.3;
                return pow(2.,-10.*t)*sin((t-p/4.)*(2.*PI)/p)+1.;
            }
            
            // Bounce easing function
            float bounceEaseOut(float t){
                if(t<4./11.){
                    return(121.*t*t)/16.;
                }else if(t<8./11.){
                    return(363./40.*t*t)-(99./10.*t)+17./5.;
                }else if(t<9./10.){
                    return(4356./361.*t*t)-(35442./1805.*t)+16061./1805.;
                }else{
                    return(54./5.*t*t)-(513./25.*t)+268./25.;
                }
            }
            
            // Combined elastic and bounce easing
            float elasticBounceEase(float t){
                if(t<.5){
                    return.5*(1.-elasticEaseOut(1.-2.*t));
                }else{
                    return.5*bounceEaseOut(2.*t-1.)+.5;
                }
            }
            
            // Add new morphing pattern functions
            vec3 morphToTorus(vec3 pos,float time,float radius){
                float theta=atan(pos.y,pos.x);
                float phi=acos(pos.z/radius);
                float r=radius*.5;
                float R=radius;
                
                vec3 torusPos=vec3(
                    (R+r*cos(phi))*cos(theta),
                    (R+r*cos(phi))*sin(theta),
                    r*sin(phi)
                );
                
                return torusPos;
            }
            
            vec3 morphToCube(vec3 pos,float time,float radius){
                vec3 cubePos=pos;
                float dist=length(pos);
                float scale=radius/max(abs(pos.x),max(abs(pos.y),abs(pos.z)));
                cubePos*=scale;
                
                // Add rounded corners
                float cornerRadius=.2;
                vec3 cornerOffset=vec3(
                    smoothstep(1.-cornerRadius,1.,abs(pos.x)),
                    smoothstep(1.-cornerRadius,1.,abs(pos.y)),
                    smoothstep(1.-cornerRadius,1.,abs(pos.z))
                );
                
                cubePos=mix(cubePos,normalize(cubePos)*radius,cornerOffset.x*cornerOffset.y*cornerOffset.z);
                return cubePos;
            }
            
            vec3 morphToOctahedron(vec3 pos,float time,float radius){
                vec3 octPos=pos;
                float dist=length(pos);
                float scale=radius/(abs(pos.x)+abs(pos.y)+abs(pos.z));
                octPos*=scale;
                
                // Add smooth edges
                float edgeRadius=.1;
                vec3 edgeOffset=vec3(
                    smoothstep(1.-edgeRadius,1.,abs(pos.x)+abs(pos.y)),
                    smoothstep(1.-edgeRadius,1.,abs(pos.y)+abs(pos.z)),
                    smoothstep(1.-edgeRadius,1.,abs(pos.z)+abs(pos.x))
                );
                
                octPos=mix(octPos,normalize(octPos)*radius,edgeOffset.x*edgeOffset.y*edgeOffset.z);
                return octPos;
            }
            
            // Enhanced sphere position calculation with improved distribution
            vec3 calculateSpherePosition(float theta,float phi,float r){
                float sinPhi=sin(phi);
                float cosPhi=cos(phi);
                float sinTheta=sin(theta);
                float cosTheta=cos(theta);
                
                // Add slight noise to radius for more organic distribution
                float radiusNoise=snoise(vec3(theta*2.,phi*2.,uTime*.1))*.1;
                float finalRadius=r*(1.+radiusNoise);
                
                return vec3(
                    finalRadius*cosPhi*cosTheta,
                    finalRadius*cosPhi*sinTheta,
                    finalRadius*sinPhi
                );
            }
            
            // Full-screen galaxy scatter for hero state.
            // Returns positions in ±0.8 range (same magnitude as old sphere) so the vertex
            // shader's uRadiusScale and per-state mix math is completely unchanged.
            // The vertex radiusScale is set to 3.5 (constant) in Particles.tsx for scatter,
            // giving a visible spread of ±0.8 × 3.5 = ±2.8 world units from page load.
            vec3 calculatePositionA(vec3 tempPos,float time,float radius){
                // Wide random scatter filling the full camera frustum.
                // Camera at z=5, fov=75 → visible half-width ≈4.7 at origin.
                // With radiusScale=1.0 the sim outputs ±1.5 which vertex then ×1.0
                // — keep raw units moderate; radiusScale in Particles.tsx does the screen-fill.
                vec3 restPos=vec3(
                    tempPos.x*1.55,// wide horizontal scatter
                    tempPos.y*1.10,// tall enough to cover screen height
                    tempPos.z*.35// thin Z band — reads as flat cloud
                );
                // Subtle wind-drift so grains float lazily
                float w=time*.055;
                vec3 drift=vec3(
                    snoise(vec3(tempPos.x*1.6,tempPos.y*1.6,w))*.055,
                    snoise(vec3(tempPos.y*1.6,tempPos.z*1.6,w+3.7))*.055,
                    snoise(vec3(tempPos.z*1.6,tempPos.x*1.6,w+7.1))*.018
                );
                return restPos+drift;
            }
            
            void main(){
                // Pre-calculate common values
                vec4 posA=texture2D(positionsA,vUv);
                vec4 posB=texture2D(positionsB,vUv);
                vec4 posC=texture2D(positionsC,vUv);
                vec4 posD=texture2D(positionsD,vUv);
                vec4 posE=texture2D(positionsE,vUv);
                
                // Apply mouse influence to all positions for consistent interaction
                // OPTIMIZATION: We removed heavy mouse repulsion from the FBO layer
                // in favor of the beautiful fluid Vortex implementation inside vertexShader.glsl
                // which is far smoother and doesn't suffer from pseudo-state-jitter.
                vec3 mouseInfluenceVector=vec3(0.);
                
                vec3 positionAWithEffects=calculatePositionA(posA.xyz,uTime*TRANSITION_SPEED,uRadiusScale);
                vec3 pos;
                
                // Apply consistent mouse interaction across all transition states
                if(uCurrentPosition==0.){
                    pos=positionAWithEffects;
                    if(uRadiusScale<1.1){
                        // OPTIMIZATION: Replace curlNoise with simple offset vector to save GPU cycles
                        vec3 simpleNoise=vec3(
                            snoise(pos*(uFrequency*1.5)+uTime*.2),
                            snoise(pos.yzx*(uFrequency*1.5)+uTime*.2),
                            snoise(pos.zxy*(uFrequency*1.5)+uTime*.2)
                        );
                        pos+=simpleNoise*.15;
                    }
                }else if(uCurrentPosition==1.){
                    // GROUPED WAVY SAND STREAMS A→B:
                    // Particles are sorted into 8 streams. Each stream shares a
                    // large-scale wave offset so the whole group curves together
                    // like a ribbon of sand — then individuals within the stream
                    // have small personal variation for organic texture.
                    vec3 modifiedPosA=positionAWithEffects;
                    vec3 modifiedPosB=posB.xyz;
                    
                    float pHash=fract(sin(dot(vUv,vec2(127.1,311.7)))*43758.5453);
                    // Assign to 1-of-8 stream groups
                    float groupId=floor(pHash*8.);// 0..7
                    float groupPhase=groupId*(3.14159/4.);// 45° apart
                    // Group-shared stagger — slightly tighter so groups overlap more
                    float groupDelay=groupId*.048;// 0..0.336
                    // Denominator increased 0.52→0.70: each particle's flight arc is
                    // longer/slower — they linger as sand before settling into brain.
                    float localT=clamp((uTransitionProgress-groupDelay-pHash*.10)/.70,0.,1.);
                    float slt=localT*localT*(3.-2.*localT);
                    
                    float flyEnv=sin(localT*3.14159);
                    
                    // ── Group-level wavy path ────────────────────────────────
                    // Each stream bends in a unique direction driven by groupPhase.
                    // The wave frequency and speed is the same for all members of the stream
                    // so they visually travel as one ribbon.
                    float waveT=uTime*.55+groupPhase;
                    vec3 groupWave=vec3(
                        sin(waveT*1.10+modifiedPosA.y*1.8)*.55,
                        cos(waveT*.85+modifiedPosA.x*1.5)*.45,
                        sin(waveT*.70+groupPhase)*.30
                    )*flyEnv;
                    
                    // ── Individual micro-variation within stream ─────────────
                    float microT=uTime*.8+pHash*6.28;
                    vec3 microWave=vec3(
                        snoise(modifiedPosA*2.5+vec3(microT,0.,0.))*.12,
                        snoise(modifiedPosA.yzx*2.5+vec3(0.,microT,0.))*.10,
                        snoise(modifiedPosA.zxy*2.5+vec3(0.,0.,microT))*.06
                    )*flyEnv;
                    
                    // Outward burst so streams spread visibly before converging
                    vec3 burstDir=normalize(modifiedPosA+vec3(.0001));
                    float burstScale=flyEnv*(.40+pHash*.25);
                    
                    pos=mix(modifiedPosA+groupWave+microWave+burstDir*burstScale,modifiedPosB,slt);
                    
                    // Settle noise fades as particle locks in
                    pos+=vec3(
                        snoise(pos*uFrequency+uTime*.12),
                        snoise(pos.yzx*uFrequency+uTime*.12),
                        snoise(pos.zxy*uFrequency+uTime*.12)
                    )*.04*(1.-slt);
                }else if(uCurrentPosition==2.){
                    // GROUPED WAVY SAND STREAMS B→C (brain → face):
                    // Brain dissolves into 8 curving ribbons that each arc through
                    // their own wave path before reassembling as the face.
                    vec3 srcPos=posB.xyz;
                    vec3 dstPos=posC.xyz;
                    
                    float h2=fract(sin(dot(vUv,vec2(43.1,127.9)))*53821.7291);
                    float gId2=floor(h2*8.);
                    float gPhase2=gId2*(3.14159/4.);
                    float gDelay2=gId2*.050;
                    float localT2=clamp((uTransitionProgress-gDelay2-h2*.07)/.53,0.,1.);
                    float slt2=localT2*localT2*(3.-2.*localT2);
                    
                    float flyEnv2=sin(localT2*3.14159);
                    
                    // Group wave — each ribbon bends together in a shared arc
                    float waveT2=uTime*.60+gPhase2;
                    vec3 groupWave2=vec3(
                        sin(waveT2*1.05+srcPos.y*2.)*.65,
                        cos(waveT2*.80+srcPos.x*1.8)*.55,
                        sin(waveT2*.65+gPhase2)*.35
                    )*flyEnv2;
                    
                    // Per-particle micro-variation within the stream
                    float microT2=uTime*.85+h2*6.28;
                    vec3 microWave2=vec3(
                        snoise(srcPos*2.8+vec3(microT2,0.,0.))*.14,
                        snoise(srcPos.yzx*2.8+vec3(0.,microT2,0.))*.12,
                        snoise(srcPos.zxy*2.8+vec3(0.,0.,microT2))*.08
                    )*flyEnv2;
                    
                    // Burst outward from brain center
                    vec3 burstDir2=normalize(srcPos+vec3(.0001))*(flyEnv2*(.50+h2*.30));
                    
                    pos=mix(srcPos+groupWave2+microWave2+burstDir2,dstPos,slt2);
                    pos+=vec3(
                        snoise(pos*uFrequency+uTime*.12),
                        snoise(pos.yzx*uFrequency+uTime*.12),
                        snoise(pos.zxy*uFrequency+uTime*.12)
                    )*.04*(1.-slt2);
                    
                }else if(uCurrentPosition==3.){
                    // GROUPED WAVY SAND STREAMS C→D (face → disperse):
                    // Face shatters into 8 arcing ribbons that swoops outward in waves.
                    vec3 srcPos=posC.xyz;
                    vec3 dstPos=posD.xyz;
                    
                    float h3=fract(sin(dot(vUv,vec2(311.7,73.13)))*87523.1234);
                    float gId3=floor(h3*8.);
                    float gPhase3=gId3*(3.14159/4.);
                    float gDelay3=gId3*.048;
                    float localT3=clamp((uTransitionProgress-gDelay3-h3*.07)/.55,0.,1.);
                    float slt3=localT3*localT3*(3.-2.*localT3);
                    
                    float flyEnv3=sin(localT3*3.14159);
                    
                    float waveT3=uTime*.58+gPhase3;
                    vec3 groupWave3=vec3(
                        sin(waveT3*1.15+srcPos.y*1.9)*.70,
                        cos(waveT3*.88+srcPos.x*1.6)*.60,
                        sin(waveT3*.72+gPhase3)*.38
                    )*flyEnv3;
                    
                    float microT3=uTime*.90+h3*6.28;
                    vec3 microWave3=vec3(
                        snoise(srcPos*3.+vec3(microT3,0.,0.))*.15,
                        snoise(srcPos.yzx*3.+vec3(0.,microT3,0.))*.13,
                        snoise(srcPos.zxy*3.+vec3(0.,0.,microT3))*.09
                    )*flyEnv3;
                    
                    vec3 burstDir3=normalize(srcPos+vec3(.0001))*(flyEnv3*(.55+h3*.35));
                    
                    pos=mix(srcPos+groupWave3+microWave3+burstDir3,dstPos,slt3);
                    pos+=vec3(
                        snoise(pos*uFrequency+uTime*.12),
                        snoise(pos.yzx*uFrequency+uTime*.12),
                        snoise(pos.zxy*uFrequency+uTime*.12)
                    )*.04*(1.-slt3);
                }else if(uCurrentPosition==4.){
                    pos=posD.xyz+mouseInfluenceVector;
                    float staticNoise=snoise(pos+uTime*.05)*.01;
                    pos+=vec3(staticNoise);
                }else if(uCurrentPosition==5.){
                    float theta=vUv.x*2.*PI;
                    float phi=vUv.y*HALF_PI;
                    float r=5.;
                    
                    vec3 spherePos=calculateSpherePosition(theta,phi,r);
                    vec3 modifiedPosD=posD.xyz+mouseInfluenceVector;
                    pos=mix(modifiedPosD,spherePos,uTransitionProgress);
                    
                    // Ensure mouse influence gradually decreases during transition
                    float mouseInfluenceFactor=(1.-uTransitionProgress)*.6;
                    pos+=mouseInfluenceVector*mouseInfluenceFactor;
                    
                    vec3 simpleNoise=vec3(
                        snoise(pos*.5+uTime*.1),
                        snoise(pos.yzx*.5+uTime*.1),
                        snoise(pos.zxy*.5+uTime*.1)
                    );
                    pos+=simpleNoise*(1.-uTransitionProgress)*.1;
                }else if(uCurrentPosition==6.){
                    float theta=vUv.x*2.*PI;
                    float phi=vUv.y*HALF_PI;
                    float r=5.*(1.-uTransitionProgress);
                    
                    vec3 spherePos=calculateSpherePosition(theta,phi,r);
                    spherePos.x+=3.*uTransitionProgress;
                    
                    // Add gradual mouse influence as we transition back to position A
                    vec3 modifiedSpherePos=spherePos+mouseInfluenceVector*uTransitionProgress;
                    pos=mix(modifiedSpherePos,positionAWithEffects,uTransitionProgress);
                    
                    vec3 simpleNoise=vec3(
                        snoise(pos*uFrequency+uTime*.1),
                        snoise(pos.yzx*uFrequency+uTime*.1),
                        snoise(pos.zxy*uFrequency+uTime*.1)
                    );
                    pos+=simpleNoise*mix(.1,.05,uTransitionProgress);
                }else if(uCurrentPosition==7.){
                    vec3 modifiedPosD=posD.xyz+mouseInfluenceVector*(1.-uTransitionProgress);
                    pos=mix(modifiedPosD,positionAWithEffects,uTransitionProgress);
                    
                    vec3 simpleNoise=vec3(
                        snoise(pos*uFrequency+uTime*.1),
                        snoise(pos.yzx*uFrequency+uTime*.1),
                        snoise(pos.zxy*uFrequency+uTime*.1)
                    );
                    pos+=simpleNoise*mix(.08,.1,uTransitionProgress);
                }else if(uCurrentPosition==8.){
                    // ── DNA DOUBLE HELIX HOLD ────────────────────────────────
                    // Two intertwined strands driven purely by vUv — no external texture.
                    // vUv.x = position along helix height (0..1)
                    // parity of hash divides particles into strand A (phase 0) vs strand B (phase π)
                    float dHash=fract(sin(dot(vUv,vec2(53.7,311.9)))*73141.7);
                    float strandPhase=step(.5,dHash)*3.14159;// 0 or PI → interleaved helices
                    float numTurns=3.5;
                    float helixT=vUv.x*numTurns*2.*3.14159;
                    float dnaHeight=(vUv.x-.5)*3.8;// vertical extent ±1.9
                    float helixR=.90;
                    // Gentle breathing pulsation so helix feels alive
                    float breathe=1.+.045*sin(uTime*.7+vUv.x*5.);
                    vec3 dnaPos=vec3(
                        helixR*cos(helixT+strandPhase)*breathe,
                        dnaHeight,
                        helixR*sin(helixT+strandPhase)*breathe
                    );
                    // Subtle per-particle micro-jitter for organic texture
                    float dnaJitter=snoise(vec3(vUv.x*8.,dHash*4.,uTime*.3))*.045;
                    dnaPos+=normalize(dnaPos)*dnaJitter;
                    pos=dnaPos;
                }else if(uCurrentPosition==9.){
                    // ── D → DNA TRANSITION (SAND STREAMS into double helix) ──
                    // Particles arc from dispersed (D) positions into their DNA slot.
                    float dHash9=fract(sin(dot(vUv,vec2(53.7,311.9)))*73141.7);
                    float strandPhase9=step(.5,dHash9)*3.14159;
                    float helixT9=vUv.x*3.5*2.*3.14159;
                    float dnaH9=(vUv.x-.5)*3.8;
                    float helixR9=.90;
                    vec3 dnaTarget=vec3(
                        helixR9*cos(helixT9+strandPhase9),
                        dnaH9,
                        helixR9*sin(helixT9+strandPhase9)
                    );
                    vec3 srcD=posD.xyz;
                    // Stagger entry so particles arrive at different times
                    float gId9=floor(dHash9*8.);
                    float gDelay9=gId9*.048;
                    float locT9=clamp((uTransitionProgress-gDelay9-dHash9*.10)/.68,0.,1.);
                    float slt9=locT9*locT9*(3.-2.*locT9);
                    float flyEnv9=sin(locT9*3.14159);
                    float gPhase9=gId9*(3.14159/4.);
                    float wT9=uTime*.50+gPhase9;
                    vec3 arc9=vec3(
                        sin(wT9*1.+srcD.y*1.5)*.50,
                        cos(wT9*.75+srcD.x*1.2)*.40,
                        sin(wT9*.60+gPhase9)*.28
                    )*flyEnv9;
                    pos=mix(srcD+arc9,dnaTarget,slt9);
                    pos+=vec3(
                        snoise(pos*uFrequency+uTime*.10),
                        snoise(pos.yzx*uFrequency+uTime*.10),
                        snoise(pos.zxy*uFrequency+uTime*.10)
                    )*.035*(1.-slt9);
                }else if(uCurrentPosition==10.){
                    // ── D → LOGO: grouped wavy sand streams from spiral (D) to logo (E) ──
                    // Particles dissolve from the DNA spiral into 8 curving ribbon streams
                    // that arc through space before converging onto the logo shape.
                    vec3 srcPos10=posD.xyz;
                    vec3 dstPos10=posE.xyz;
                    
                    float h10=fract(sin(dot(vUv,vec2(53.7,311.9)))*73141.7);
                    float gId10=floor(h10*8.);
                    float gPhase10=gId10*(3.14159/4.);
                    // Stagger: each of the 8 groups starts slightly later
                    float gDelay10=gId10*.048;
                    // Per-particle offset so the stream has organic spread
                    float localT10=clamp((uTransitionProgress-gDelay10-h10*.09)/.68,0.,1.);
                    float slt10=localT10*localT10*(3.-2.*localT10);
                    
                    // Arc envelope — rises then falls so particles swing outward mid-flight
                    float flyEnv10=sin(localT10*3.14159);
                    
                    // Group-shared wave so each ribbon bends together
                    float waveT10=uTime*.55+gPhase10;
                    vec3 groupWave10=vec3(
                        sin(waveT10*1.10+srcPos10.y*1.8)*.55,
                        cos(waveT10*.85+srcPos10.x*1.5)*.45,
                        sin(waveT10*.70+gPhase10)*.30
                    )*flyEnv10;
                    
                    // Per-particle micro-variation inside the stream
                    float microT10=uTime*.80+h10*6.28318;
                    vec3 microWave10=vec3(
                        snoise(srcPos10*2.5+vec3(microT10,0.,0.))*.12,
                        snoise(srcPos10.yzx*2.5+vec3(0.,microT10,0.))*.10,
                        snoise(srcPos10.zxy*2.5+vec3(0.,0.,microT10))*.06
                    )*flyEnv10;
                    
                    // Outward burst at the start of the arc so ribbons visibly diverge
                    vec3 burstDir10=normalize(srcPos10+vec3(.0001));
                    float burstScale10=flyEnv10*(.40+h10*.25);
                    
                    pos=mix(srcPos10+groupWave10+microWave10+burstDir10*burstScale10,dstPos10,slt10);
                    
                    // Settle noise fades as particles lock into the logo
                    pos+=vec3(
                        snoise(pos*uFrequency+uTime*.12),
                        snoise(pos.yzx*uFrequency+uTime*.12),
                        snoise(pos.zxy*uFrequency+uTime*.12)
                    )*.04*(1.-slt10);
                }else if(uCurrentPosition==11.){
                    // ── LOGO HOLD — particles rest on the logo shape with subtle breathing ──
                    float breatheLogo=1.+.025*sin(uTime*.6+posE.x*3.+posE.y*2.);
                    pos=posE.xyz*breatheLogo;
                    // tiny micro-jitter so particles feel alive without drifting
                    float jL=snoise(vec3(vUv.x*6.,vUv.y*6.,uTime*.25))*.018;
                    pos+=normalize(posE.xyz+vec3(.0001))*jL;
                }
                
                gl_FragColor=vec4(pos,1.);
            }
            