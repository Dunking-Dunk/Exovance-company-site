varying vec4 vColor;
uniform vec3 uColor;
uniform float uTime;

void main(){
    vec3 finalColor=uColor;
    
    float brightness=.8+sin(uTime*.5)*.05;
    finalColor*=brightness;
    
    float alpha=1.;
    gl_FragColor=vec4(finalColor,alpha);
}
