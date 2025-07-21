varying vec4 vColor;
uniform vec3 uColor;
uniform float uTime;

void main(){
    // Use the theme-based color directly from uniform
    vec3 finalColor=uColor;
    
    // Add very subtle animation to brightness for living effect
    float brightness=.8+sin(uTime*.5)*.05;
    finalColor*=brightness;
    
    // Apply particle with full opacity for strong contrast
    float alpha=1.;
    gl_FragColor=vec4(finalColor,alpha);
}
