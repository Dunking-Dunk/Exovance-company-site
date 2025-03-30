#define POINT_SIZE_MIN 1.
#define POINT_SIZE_MAX 8.
#define POINT_SIZE_BASE 4.
#define COLOR_INTENSITY_BASE.6
#define COLOR_INTENSITY_AMPLITUDE.5
#define TIME_FACTOR.5
#define TIME_AMPLITUDE.1

uniform sampler2D uPositions;
uniform float uTime;
uniform vec3 uMouse;
uniform float uScroll;
uniform float uTransitionProgress;
uniform float uRadiusScale;
uniform float uCurrentPosition;

varying vec4 vColor;

// Optimized position calculation
vec3 calculatePosition(vec3 pos){
    // Base position
    vec3 finalPos=pos;
    
    // Apply mouse interaction with smooth transition
    float mouseInfluence=.5;
    vec3 mousePos=uMouse*mouseInfluence;
    finalPos+=mousePos*(1.-uTransitionProgress);
    
    // Apply scroll-based scaling
    finalPos*=uRadiusScale;
    
    // Apply position transitions based on scroll
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
    
    // Optimized color calculation
    float angle=atan(pos.y,pos.x);
    float timeFactor=sin(uTime*TIME_FACTOR)*TIME_AMPLITUDE;
    float colorIntensity=COLOR_INTENSITY_BASE+COLOR_INTENSITY_AMPLITUDE*sin(angle+timeFactor);
    vColor=vec4(colorIntensity)*4.;
    
    // Optimized position transformations
    vec4 modelPosition=modelMatrix*vec4(pos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectedPosition;
    
    // Dynamic point size with smooth falloff
    float distance=length(viewPosition.xyz);
    float pointSize=POINT_SIZE_BASE*(1./(distance+1.));
    gl_PointSize=clamp(pointSize,POINT_SIZE_MIN,POINT_SIZE_MAX);
}