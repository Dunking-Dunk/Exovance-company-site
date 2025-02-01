varying vec4 vColor;
uniform vec3 uColor;

void main(){
    vec3 color1=uColor;
    vec3 color2=vec3(0.,0.,0.);
    vec3 color=mix(color2,color1,.2);
    
    gl_FragColor=vColor*vec4(color,1.);
}
