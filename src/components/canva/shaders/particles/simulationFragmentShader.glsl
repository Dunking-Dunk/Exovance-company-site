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
            
            // Enhanced position calculation with ultra-slow elastic spring behavior
            vec3 calculatePositionA(vec3 tempPos,float time,float radius){
                // Pre-calculate common values
                vec3 spherePos=curlNoise(tempPos*uFrequency)*1.5;
                vec2 mouse=vec2(uMouse.x,uMouse.y)*2.;// Scale to match particle space
                vec2 prevMouse=vec2(uPrevMouse.x,uPrevMouse.y)*2.;
                vec2 mouseVelocity=mouse-prevMouse;
                float mouseSpeed=length(mouseVelocity)*SLOW_MOTION_FACTOR;// Apply slow motion to velocity
                
                float dist=length(tempPos.xy-mouse);
                vec2 dir=normalize(tempPos.xy-mouse);
                
                // Calculate original position that particles should return to
                vec3 originalPos=mix(tempPos,spherePos,.1);
                originalPos=normalize(originalPos)*radius;
                
                // Enhanced mouse interaction with ultra-slow elastic behavior
                vec3 mouseRepulsion=vec3(0.);
                float mouseActive=uMouseActive;
                
                // Custom easing for super slow elastic return
                float returnProgress=0.;
                float elasticFactor=0.;
                
                if(mouseActive>0.){
                    // Super slow time calculation
                    float timeSinceActive=(time-mouseActive)*SLOW_MOTION_FACTOR;
                    returnProgress=clamp(timeSinceActive/RETURN_DELAY,0.,1.);
                    
                    // Create complex elastic return pattern
                    // First phase: extremely slow outward movement
                    if(returnProgress<.1){
                        elasticFactor=1.-returnProgress*2.;
                    }
                    // Second phase: ultra-slow return with minimal oscillations
                    else{
                        // Normalized time for elastic function (0-1 range for the return portion)
                        float elasticTime=(returnProgress-.1)/.9;
                        
                        // Calculate base return factor with slow decay
                        float baseReturn=pow(1.-elasticTime,EASING_POWER)*(1.-elasticTime*.3);
                        
                        // Add very subtle oscillations with long period
                        float oscillation=sin(elasticTime*OSCILLATION_FREQUENCY*PI)*
                        exp(-elasticTime*.5)*
                        OSCILLATION_STRENGTH;
                        
                        // Combine for slow elastic effect
                        elasticFactor=baseReturn+oscillation;
                        
                        // Apply subtle elastic bounce pattern for late stages
                        if(elasticTime>.7){
                            float bounceFactor=elasticBounceEase(elasticTime)*.05;
                            elasticFactor+=bounceFactor*(1.-elasticTime);
                        }
                    }
                }
                
                // Only apply repulsion if mouse is active
                if(mouseActive>0.){
                    float smoothDist=smoothstep(uMouseRadius*2.5,0.,dist);
                    
                    // Add directional velocity based on mouse movement (slowed down)
                    vec2 velocityEffect=vec2(0.);
                    if(mouseSpeed>.0005){
                        velocityEffect=normalize(mouseVelocity)*mouseSpeed*2.;
                    }
                    
                    // Ultra-amplified displacement with slow motion
                    mouseRepulsion.xy=(dir+velocityEffect*.3)*
                    MOUSE_INFLUENCE*
                    smoothDist*
                    elasticFactor*
                    DISPLACEMENT_AMPLIFIER;
                    
                    // Add very slow vertical displacement
                    mouseRepulsion.z=smoothDist*
                    elasticFactor*
                    (1.+sin(dist*3.+time*.5)*.7);
                    
                    // Add slow spiral movement during initial displacement
                    if(returnProgress<.2){
                        float spiralAngle=returnProgress*5.;
                        vec2 spiral=vec2(cos(spiralAngle),sin(spiralAngle))*.2*(.2-returnProgress);
                        mouseRepulsion.xy+=spiral*smoothDist;
                    }
                }
                
                // Calculate displaced position with ultra-slow motion
                vec3 tempTarget=originalPos+mouseRepulsion;
                
                // Apply super weak spring physics for extremely slow return
                if(mouseActive>0.&&returnProgress>0.&&returnProgress<.999){
                    // Calculate distance for strength adjustment
                    float distFromOriginal=length(tempTarget-originalPos);
                    
                    // Extremely weak spring for ultra-slow return
                    float adaptiveSpringStrength=SPRING_STRENGTH*(.2+distFromOriginal*.1);
                    
                    // Calculate spring force with minimal strength
                    vec3 springForce=(originalPos-tempTarget)*adaptiveSpringStrength;
                    
                    // Apply near-zero damping for extremely slow movement
                    float dampingFactor=SPRING_DAMPING*(.1+sin(time*.2)*.1);
                    tempTarget+=springForce*(1.-elasticFactor*dampingFactor);
                    
                    // Add very subtle rotational motion during return
                    if(returnProgress>.3&&returnProgress<.9){
                        float rotAngle=time*.5;
                        float rotRadius=.05*(.9-returnProgress);
                        vec3 rotOffset=vec3(
                            cos(rotAngle)*rotRadius,
                            sin(rotAngle)*rotRadius,
                            sin(rotAngle*.5)*rotRadius*.5
                        );
                        tempTarget+=rotOffset*elasticFactor;
                    }
                }
                
                // Calculate morphing patterns with slower transitions
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
                
                // Add minimal noise effects for smoother movement
                float noiseScale=.15;
                vec3 noiseOffset=curlNoise(morphTarget+time*.2)*noiseScale;
                float noiseStrength=snoise(morphTarget+time*.1);
                
                // Apply final effects with reduced strength for smoother transitions
                float effectStrength=radius<1.1?.2:.15;
                vec3 finalPosWithEffects=morphTarget;
                finalPosWithEffects+=curlNoise(finalPosWithEffects+3.)*effectStrength*.6;
                finalPosWithEffects+=snoise(finalPosWithEffects+time*.3)*(effectStrength*.3);
                finalPosWithEffects+=noiseOffset*noiseStrength*.7;
                
                // Apply distance-based scaling with gentle mouse interaction
                float distanceFromCenter=length(finalPosWithEffects);
                if(distanceFromCenter<1.){
                    float mouseInfluence=smoothstep(uMouseRadius,0.,dist)*.7;
                    finalPosWithEffects=normalize(finalPosWithEffects)*(1.+(1.-distanceFromCenter)*mouseInfluence);
                }
                
                return finalPosWithEffects;
            }
            
            void main(){
                // Pre-calculate common values
                vec4 posA=texture2D(positionsA,vUv);
                vec4 posB=texture2D(positionsB,vUv);
                vec4 posC=texture2D(positionsC,vUv);
                vec4 posD=texture2D(positionsD,vUv);
                
                // Apply mouse influence to all positions for consistent interaction
                vec2 mouse=vec2(uMouse.x,uMouse.y)*2.;
                vec3 mouseInfluenceVector=vec3(0.);
                
                if(uMouseActive>0.){
                    float timeSinceActive=(uTime-uMouseActive)*SLOW_MOTION_FACTOR;
                    float mouseProgress=clamp(timeSinceActive/RETURN_DELAY,0.,1.);
                    float effectStrength=1.-mouseProgress;
                    
                    // Calculate common mouse influence to apply across all positions
                    for(int i=0;i<4;i++){
                        vec3 currentPos=i==0?posA.xyz:(i==1?posB.xyz:(i==2?posC.xyz:posD.xyz));
                        float dist=length(currentPos.xy-mouse);
                        if(dist<uMouseRadius*3.){
                            vec2 dir=normalize(currentPos.xy-mouse);
                            float distFactor=smoothstep(uMouseRadius*3.,0.,dist);
                            mouseInfluenceVector.xy+=dir*distFactor*effectStrength*MOUSE_INFLUENCE*.25;
                            mouseInfluenceVector.z+=distFactor*sin(dist*5.)*.2*effectStrength;
                        }
                    }
                }
                
                vec3 positionAWithEffects=calculatePositionA(posA.xyz,uTime*TRANSITION_SPEED,uRadiusScale);
                vec3 pos;
                
                // Apply consistent mouse interaction across all transition states
                if(uCurrentPosition==0.){
                    pos=positionAWithEffects;
                    if(uRadiusScale<1.1){
                        pos+=curlNoise(pos*(uFrequency*1.5)+uTime*.2)*.15;
                    }
                }else if(uCurrentPosition==1.){
                    // Apply mouse influence to both start and end positions
                    vec3 modifiedPosA=positionAWithEffects+mouseInfluenceVector;
                    vec3 modifiedPosB=posB.xyz+mouseInfluenceVector;
                    pos=mix(modifiedPosA,modifiedPosB,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*mix(.1,.05,uTransitionProgress);
                }else if(uCurrentPosition==2.){
                    vec3 modifiedPosB=posB.xyz+mouseInfluenceVector;
                    vec3 modifiedPosC=posC.xyz+mouseInfluenceVector;
                    pos=mix(modifiedPosB,modifiedPosC,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*.05;
                }else if(uCurrentPosition==3.){
                    vec3 modifiedPosC=posC.xyz+mouseInfluenceVector;
                    vec3 modifiedPosD=posD.xyz+mouseInfluenceVector;
                    pos=mix(modifiedPosC,modifiedPosD,uTransitionProgress);
                    float transitionNoise=snoise(pos+uTime*.1)*(1.-uTransitionProgress)*.02;
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*.05;
                    pos+=vec3(transitionNoise);
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
                    
                    vec3 noise=curlNoise(pos*.5+uTime*.1);
                    pos+=noise*(1.-uTransitionProgress)*.1;
                }else if(uCurrentPosition==6.){
                    float theta=vUv.x*2.*PI;
                    float phi=vUv.y*HALF_PI;
                    float r=5.*(1.-uTransitionProgress);
                    
                    vec3 spherePos=calculateSpherePosition(theta,phi,r);
                    spherePos.x+=3.*uTransitionProgress;
                    
                    // Add gradual mouse influence as we transition back to position A
                    vec3 modifiedSpherePos=spherePos+mouseInfluenceVector*uTransitionProgress;
                    pos=mix(modifiedSpherePos,positionAWithEffects,uTransitionProgress);
                    
                    vec3 noise=curlNoise(pos*uFrequency+uTime*.1);
                    pos+=noise*mix(.1,.05,uTransitionProgress);
                }else if(uCurrentPosition==7.){
                    vec3 modifiedPosD=posD.xyz+mouseInfluenceVector*(1.-uTransitionProgress);
                    pos=mix(modifiedPosD,positionAWithEffects,uTransitionProgress);
                    pos+=curlNoise(pos*uFrequency+uTime*.1)*mix(.08,.1,uTransitionProgress);
                }
                
                gl_FragColor=vec4(pos,1.);
            }