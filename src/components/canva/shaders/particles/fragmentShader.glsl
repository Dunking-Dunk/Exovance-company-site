varying vec4 vColor;
varying float vSparkle;
uniform vec3 uColor;
uniform float uTime;
uniform float uFade;

void main(){
    // Vector from center of the point (0.5, 0.5) to the current pixel
    vec2 cxy=2.*gl_PointCoord-1.;
    float r=dot(cxy,cxy);
    
    // Discard pixels outside the circle radius
    if(r>1.){
        discard;
    }
    
    // Soft glow falloff for the base disc
    float baseAlpha=exp(-r*3.)*vColor.a;
    
    // 4-ray sparkle cross (horizontal + vertical spikes)
    float ax=abs(cxy.x);
    float ay=abs(cxy.y);
    float hRay=exp(-ay*18.)*(1.-ax);// horizontal spike
    float vRay=exp(-ax*18.)*(1.-ay);// vertical spike
    // 45-degree diagonal rays (softer, ~60% intensity)
    float d1=exp(-abs(cxy.x+cxy.y)*22.);
    float d2=exp(-abs(cxy.x-cxy.y)*22.);
    float starShape=max(max(hRay,vRay),max(d1,d2)*.6);
    starShape*=clamp(1.-r,0.,1.);// fade star tips near edge of disc
    
    // Sparkle contributes extra brightness and the star cross shape
    // vSparkle=0 → normal round dot; vSparkle=1 → bright star burst
    float sparkleAlpha=starShape*vSparkle*vColor.a*2.5;
    vec3 sparkleColor=vec3(1.,1.,1.);// pure white flash for the cross rays
    
    float totalAlpha=baseAlpha+sparkleAlpha;
    // Blend sparkle white into base colour proportional to sparkle intensity
    vec3 finalColor=mix(vColor.rgb,sparkleColor,vSparkle*starShape);
    
    // Standard (non-premultiplied) output
    gl_FragColor=vec4(finalColor,totalAlpha*uFade);
}
