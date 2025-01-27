varying vec4 vColor;

void main(){
    vec3 color1=vec3(.7333,.6745,.6745);
    vec3 color2=vec3(.0745,.0627,.0627);
    vec3 color=mix(color2,color1,.2);
    
    gl_FragColor=vColor*vec4(color,1.);
}
