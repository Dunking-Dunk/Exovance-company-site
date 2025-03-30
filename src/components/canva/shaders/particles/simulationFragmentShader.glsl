#define PI 3.1415926538
#define HALF_PI 1.5707963267948966
#define NOISE_SCALE 289.
#define NOISE_NORM 1.79284291400159
#define NOISE_NORM2.85373472095314
#define NOISE_OFFSET vec3(0.,19.1,33.4)
#define NOISE_OFFSET2 vec3(47.2,0.,0.)
#define MOUSE_INFLUENCE.8
#define SPHERE_RADIUS 1.
#define TRANSITION_SPEED.3
#define MORPH_SPEED.2
#define MORPH_PATTERNS 4.

uniform sampler2D positionsA;
uniform sampler2D positionsB;
uniform sampler2D positionsC;
uniform sampler2D positionsD;
uniform float uTime;
uniform float uFrequency;
uniform vec3 uMouse;
uniform float uMouseRadius;
uniform float uScroll;
uniform float uTransitionProgress;
uniform float uRadiusScale;
uniform float uCurrentPosition;

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
            
            // Enhanced position calculation with multiple morphing patterns
            vec3 calculatePositionA(vec3 tempPos,float time,float radius){
                // Pre-calculate common values
                vec3 spherePos=curlNoise(tempPos*uFrequency)*1.5;
                vec2 mouse=vec2(uMouse.x,uMouse.y)*5.;
                float dist=length(tempPos.xy-mouse);
                vec2 dir=normalize(tempPos.xy-mouse);
                
                // Enhanced mouse interaction
                vec3 mouseRepulsion=vec3(0.);
                float smoothDist=smoothstep(uMouseRadius,0.,dist);
                mouseRepulsion.xy=dir*MOUSE_INFLUENCE*smoothDist;
                mouseRepulsion.z=smoothDist;
                
                // Calculate base target position
                vec3 tempTarget=mix(tempPos,spherePos,.1);
                tempTarget+=mouseRepulsion;
                tempTarget=normalize(tempTarget)*radius;
                
                // Calculate morphing patterns
                float morphTime=time*MORPH_SPEED;
                float patternIndex=mod(morphTime/5.,MORPH_PATTERNS);
                
                // Smooth transitions between morphing patterns
                vec3 morphTarget;
                if(patternIndex<1.){
                    morphTarget=tempTarget;
                }else if(patternIndex<2.){
                    float t=patternIndex-1.;
                    morphTarget=mix(tempTarget,morphToTorus(tempTarget,time,radius),t);
                }else if(patternIndex<3.){
                    float t=patternIndex-2.;
                    morphTarget=mix(morphToTorus(tempTarget,time,radius),morphToCube(tempTarget,time,radius),t);
                }else{
                    float t=patternIndex-3.;
                    morphTarget=mix(morphToCube(tempTarget,time,radius),morphToOctahedron(tempTarget,time,radius),t);
                }
                
                // Add dynamic noise effects
                float noiseScale=.3;
                vec3 noiseOffset=curlNoise(morphTarget+time*.5)*noiseScale;
                float noiseStrength=snoise(morphTarget+time*.2);
                
                // Apply final effects
                float effectStrength=radius<1.1?.3:.2;
                vec3 finalPos=morphTarget;
                finalPos+=curlNoise(finalPos+3.)*effectStrength;
                finalPos+=snoise(finalPos+time)*(effectStrength*.5);
                finalPos+=noiseOffset*noiseStrength;
                
                // Apply distance-based scaling with enhanced mouse interaction
                float distanceFromCenter=length(finalPos);
                if(distanceFromCenter<1.){
                    float mouseInfluence=smoothstep(uMouseRadius,0.,dist);
                    finalPos=normalize(finalPos)*(1.+(1.-distanceFromCenter)*mouseInfluence);
                }
                
                return finalPos;
            }
            
            // Optimized sphere position calculation
            vec3 calculateSpherePosition(float theta,float phi,float r){
                float sinPhi=sin(phi);
                float cosPhi=cos(phi);
                float sinTheta=sin(theta);
                float cosTheta=cos(theta);
                
                return vec3(
                    r*cosPhi-3.,
                    r*sinPhi*sinTheta,
                    r*sinPhi*cosTheta
                );
            }
            
            void main(){
                // Pre-calculate common values
                vec4 posA=texture2D(positionsA,vUv);
                vec4 posB=texture2D(positionsB,vUv);
                vec4 posC=texture2D(positionsC,vUv);
                vec4 posD=texture2D(positionsD,vUv);
                
                vec3 positionAWithEffects=calculatePositionA(posA.xyz,uTime*TRANSITION_SPEED,uRadiusScale);
                vec3 pos;
                
                // Optimized position transitions
                if(uCurrentPosition==0.){
                    pos=positionAWithEffects;
                    if(uRadiusScale<1.1){
                        pos+=curlNoise(pos*(uFrequency*1.5)+uTime*.2)*.15;
                    }
                }else if(uCurrentPosition==1.){
                    pos=mix(positionAWithEffects,posB.xyz,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*mix(.1,.05,uTransitionProgress);
                }else if(uCurrentPosition==2.){
                    pos=mix(posB.xyz,posC.xyz,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*.05;
                }else if(uCurrentPosition==3.){
                    pos=mix(posC.xyz,posD.xyz,uTransitionProgress);
                    float transitionNoise=snoise(pos+uTime*.1)*(1.-uTransitionProgress)*.02;
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*.05;
                    pos+=vec3(transitionNoise);
                }else if(uCurrentPosition==4.){
                    pos=posD.xyz;
                    float staticNoise=snoise(pos+uTime*.05)*.01;
                    pos+=vec3(staticNoise);
                }else if(uCurrentPosition==5.){
                    float theta=vUv.x*2.*PI;
                    float phi=vUv.y*HALF_PI;
                    float r=5.;
                    
                    vec3 spherePos=calculateSpherePosition(theta,phi,r);
                    pos=mix(posD.xyz,spherePos,uTransitionProgress);
                    
                    vec3 noise=curlNoise(pos*.5+uTime*.1);
                    pos+=noise*(1.-uTransitionProgress)*.1;
                }else if(uCurrentPosition==6.){
                    float theta=vUv.x*2.*PI;
                    float phi=vUv.y*HALF_PI;
                    float r=5.*(1.-uTransitionProgress);
                    
                    vec3 spherePos=calculateSpherePosition(theta,phi,r);
                    spherePos.x+=3.*uTransitionProgress;
                    
                    pos=mix(spherePos,positionAWithEffects,uTransitionProgress);
                    
                    vec3 noise=curlNoise(pos*uFrequency+uTime*.1);
                    pos+=noise*mix(.1,.05,uTransitionProgress);
                }else if(uCurrentPosition==7.){
                    pos=mix(posD.xyz,positionAWithEffects,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*mix(.08,.1,uTransitionProgress);
                }
                
                gl_FragColor=vec4(pos,1.);
            }