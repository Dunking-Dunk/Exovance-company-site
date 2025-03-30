#define POINT_SIZE_MIN 1.
#define POINT_SIZE_MAX 8.
#define POINT_SIZE_BASE 4.
#define COLOR_INTENSITY_BASE.6
#define COLOR_INTENSITY_AMPLITUDE.5
#define TIME_FACTOR.5
#define TIME_AMPLITUDE.1
#define GLOW_INTENSITY.3
#define PULSE_SPEED 2.

uniform sampler2D uPositions;
uniform float uTime;
uniform vec3 uMouse;
uniform float uScroll;
uniform float uTransitionProgress;
uniform float uRadiusScale;
uniform float uCurrentPosition;

varying vec4 vColor;

// Optimized position calculation with enhanced effects
vec3 calculatePosition(vec3 pos){
    // Base position
    vec3 finalPos=pos;
    
    // Enhanced mouse interaction with smooth transition
    float mouseInfluence=.5;
    vec3 mousePos=uMouse*mouseInfluence;
    float mouseDist=length(finalPos-mousePos);
    float mouseEffect=smoothstep(2.,0.,mouseDist);
    finalPos+=mousePos*(1.-uTransitionProgress)*mouseEffect;
    
    // Apply scroll-based scaling with smooth transition
    finalPos*=uRadiusScale;
    
    // Apply position transitions based on scroll with enhanced effects
    float transition=uTransitionProgress;
    if(uCurrentPosition==1.){// A-B transition
        finalPos=mix(finalPos,finalPos*2.,transition);
    }else if(uCurrentPosition==2.){// B-C transition
        finalPos=mix(finalPos*2.,finalPos*.5,transition);
    }else if(uCurrentPosition==3.){// C-D transition
        finalPos=mix(finalPos*.5,finalPos*1.5,transition);
    }else if(uCurrentPosition==4.){// D position
        finalPos*=1.5;
    }else if(uCurrentPosition==5.){// D-S transition
        finalPos=mix(finalPos*1.5,finalPos*.8,transition);
    }else if(uCurrentPosition==6.){// S-A transition
        finalPos=mix(finalPos*.8,finalPos,transition);
    }
    
    return finalPos;
}

void main(){
    // Optimized position sampling
    vec3 pos=texture2D(uPositions,position.xy).xyz;
    pos=calculatePosition(pos);
    
    // Enhanced color calculation with pulsing effect
    float angle=atan(pos.y,pos.x);
    float timeFactor=sin(uTime*TIME_FACTOR)*TIME_AMPLITUDE;
    float pulseEffect=sin(uTime*PULSE_SPEED)*.5+.5;
    float colorIntensity=COLOR_INTENSITY_BASE+COLOR_INTENSITY_AMPLITUDE*sin(angle+timeFactor);
    colorIntensity*=(1.+GLOW_INTENSITY*pulseEffect);
    vColor=vec4(colorIntensity)*4.;
    
    // Optimized position transformations
    vec4 modelPosition=modelMatrix*vec4(pos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectedPosition;
    
    // Dynamic point size with enhanced falloff and pulse
    float distance=length(viewPosition.xyz);
    float baseSize=POINT_SIZE_BASE*(1./(distance+1.));
    float pulseSize=baseSize*(1.+.2*pulseEffect);
    gl_PointSize=clamp(pulseSize,POINT_SIZE_MIN,POINT_SIZE_MAX);
}