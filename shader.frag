#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.14159

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;

varying vec2 v_texcoord;

void main(void) {
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv += -1.0;

    // make mouse position
    vec2 mouse = u_mouse / u_resolution;
    
    
    float radius = length(uv) * mix(1.0, 2.0, mouse.x);
    float angle = atan(uv.y, uv.x);
    
    // get a segment
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    // repeat segment
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    
    angle += u_time * 0.2;
    angle += mouse.y;
    
    // unsquash segments
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point *= vec2(1.0, 0.666);
    point = fract(point);
    
    vec4 imageColor = texture2D(image, point);
    
    vec4 color = vec4(imageColor);
    
    gl_FragColor = vec4(color);
}