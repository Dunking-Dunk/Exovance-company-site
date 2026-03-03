#define POINT_SIZE_MIN 2.
#define POINT_SIZE_MAX 18.
#define POINT_SIZE_BASE 6.5
#define COLOR_INTENSITY_BASE.75
#define COLOR_INTENSITY_AMPLITUDE.45
#define TIME_FACTOR.25
#define TIME_AMPLITUDE.18
#define GLOW_INTENSITY.6
#define PULSE_SPEED 2.5
// Mouse is in NDC [-1,1], particles in hero state span [-3.5,3.5] so scale accordingly
#define MOUSE_INFLUENCE 3.5
#define MOUSE_RADIUS.4

uniform sampler2D uPositions;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uMouse;
uniform float uScroll;
uniform float uTransitionProgress;
uniform float uRadiusScale;
uniform float uCurrentPosition;
uniform float uParticleOffset;
uniform float uMouseActive;// 0 = mouse never moved, >0 = timestamp of last move

varying vec4 vColor;
varying float vSparkle;

// Optimized position calculation with fluid organic effects
vec3 calculatePosition(vec3 pos){
    // Base position
    vec3 finalPos=pos;
    
    // Gate: zero mouse influence until user has actually moved their mouse
    float mouseGate=uMouseActive>0.?1.:0.;
    
    // Active Theory slow water-push interaction
    // Large, soft radius — particles drift away gradually like floating on a water surface
    float RIPPLE_RADIUS=4.;
    float REPULSION_STRENGTH=.45;
    
    // Mouse coords come in as NDC [-1,1], scale to particle space
    vec3 mousePos=uMouse*MOUSE_INFLUENCE;
    vec3 delta=finalPos-mousePos;
    float mouseDist=length(delta.xy);
    
    // Very wide, gentle cubic falloff
    float t=clamp(mouseDist/RIPPLE_RADIUS,0.,1.);
    float mouseEffect=(1.-t)*(1.-t)*(1.-t);// cubic, softest near edges
    
    // Gentle outward push only — no swirl/rotation (that’s what made it feel mechanical)
    vec3 pushDir=normalize(vec3(delta.xy+vec2(.0001),0.));
    finalPos+=pushDir*mouseEffect*REPULSION_STRENGTH*mouseGate;
    
    // Slow pressure ripple — creates the water-surface undulation felt in Active Theory
    float ripplePhase=mouseDist*4.-uTime*2.5;
    float ripple=sin(ripplePhase)*.07*mouseEffect*mouseGate;
    finalPos.z+=ripple;
    
    // Apply scroll-based scaling — radiusScale from Particles.tsx is the sole size control
    finalPos*=uRadiusScale;
    // NOTE: per-state multipliers removed — they were over-scaling models into rings/circles
    
    return finalPos;
}

void main(){
    // Optimized position sampling
    vec3 pos=texture2D(uPositions,position.xy).xyz;
    pos=calculatePosition(pos);
    
    // Apply upward particle offset when stopped
    pos.y+=uParticleOffset;
    
    // Enhanced color calculation with pulsing effect & organic variance
    float angle=atan(pos.y,pos.x);
    float timeFactor=sin(uTime*TIME_FACTOR+position.x*10.)*TIME_AMPLITUDE;
    float pulseEffect=sin(uTime*PULSE_SPEED+position.y*20.)*.5+.5;
    
    // Core intensity with subtle variance per-particle
    float colorIntensity=COLOR_INTENSITY_BASE+COLOR_INTENSITY_AMPLITUDE*sin(angle+timeFactor);
    colorIntensity*=(1.+GLOW_INTENSITY*pulseEffect);
    
    // darkMode uniform no longer used — single palette across the whole app
    
    // Per-particle random phase for independent twinkling
    float shimmer=sin(uTime*3.+position.x*40.+position.y*40.)*.04;
    float particlePhase=fract(sin(dot(position.xy,vec2(12.9898,78.233)))*43758.5453)*6.2832;
    float twinkleFreq=1.5+fract(sin(dot(position.xy,vec2(39.346,11.135)))*43758.5453)*3.5;
    // pow(...,8): mostly dark, occasional sharp white spike
    float sparkleFlash=pow(max(0.,sin(uTime*twinkleFreq+particlePhase)),8.);
    vSparkle=sparkleFlash;
    
    // DEEP VIOLET PALETTE — pure violet (hue ~270°) with slight hue variance
    float hueShift=fract(sin(dot(position.xy,vec2(17.2,53.7)))*43758.5453);
    // deep violet: strong blue, medium-high red, zero green
    vec3 deepViolet=vec3(
        .38+hueShift*.12+shimmer,// R: 0.38-0.50  (medium-high for violet hue)
        .00+hueShift*.005,// G: ~0  (zero green keeps it pure violet)
        .72+hueShift*.20+shimmer// B: 0.72-0.92  (dominant — this is what makes violet)
    );
    // Sparkle: bright white-violet flash
    vec3 sparkleColor=vec3(.80+hueShift*.08,.60+hueShift*.10,1.);
    // Moderate multiply so deep violet reads correctly (not washed out)
    vec3 finalColor=mix(deepViolet*colorIntensity*3.8,sparkleColor*5.,sparkleFlash);
    
    // Alpha: dim base, spikes fully opaque on flash
    float dynamicAlpha=mix(.4+.2*pulseEffect,1.,sparkleFlash);
    if(uCurrentPosition<.5){
        float distFromCenter=length(pos.xy);
        // Widen fade boundary to match the larger spread radius
        float edgeFade=1.-smoothstep(5.,8.5,distFromCenter);
        dynamicAlpha*=edgeFade;
    }
    vColor=vec4(finalColor,dynamicAlpha);
    
    // Optimized position transformations
    vec4 modelPosition=modelMatrix*vec4(pos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectedPosition;
    
    // Dynamic point size with enhanced falloff, pulse & randomized size
    float distance=length(viewPosition.xyz);
    float baseSize=POINT_SIZE_BASE*(1./(distance+.5));
    
    // Adding noise to baseSize to give stars varying depth/size
    float randomScale=mod(sin(dot(position.xy,vec2(12.9898,78.233)))*43758.5453,1.);
    baseSize*=(.5+randomScale);
    
    float pulseSize=baseSize*(1.+.4*pulseEffect);
    gl_PointSize=clamp(pulseSize,POINT_SIZE_MIN,POINT_SIZE_MAX);
}
