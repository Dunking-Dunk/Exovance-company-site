varying vec4 vColor;
uniform vec3 uColor;
uniform float uTime;

void main(){
    // Optimized color mixing with smooth transition
    vec3 color1=uColor;
    vec3 color2=vec3(0.);
    
    // Add subtle animation to color mixing
    float mixFactor=.2+sin(uTime*.5)*.05;
    vec3 color=mix(color2,color1,mixFactor);
    
    // Apply color with smooth alpha transition
    float alpha=smoothstep(0.,1.,vColor.a);
    gl_FragColor=vec4(color*vColor.rgb,alpha);
}
