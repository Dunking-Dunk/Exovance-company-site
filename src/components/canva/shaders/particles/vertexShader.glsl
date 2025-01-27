uniform sampler2D uPositions;
uniform float uTime;
varying vec4 vColor;

void main(){
    vec3 pos=texture2D(uPositions,position.xy).xyz;
    
    // Calculate color based on position
    float angle=atan(pos.y,pos.x);
    vColor=vec4(.6+.5*sin(angle))*4.;
    
    vec4 modelPosition=modelMatrix*vec4(pos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectedPosition;
    
    // Dynamic point size based on distance
    gl_PointSize=4.*(1./-viewPosition.z);
}