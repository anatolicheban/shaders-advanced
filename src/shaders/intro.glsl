varying vec2 vUv;
uniform float iTime;
uniform vec2 iResolution;

vec3 palette(in float t)
{
    vec3 a = vec3(.5);
    vec3 b = vec3(.5);
    vec3 c = vec3(1);
    vec3 d = vec3(0.263, 0.416, .557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 uv = (vUv * 2.0 - 1.0);
    uv.x *= iResolution.x / iResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0);

    for(float i = 0.0; i < 3.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i * .4 + iTime / 1400.0);
        d = sin(d * 10.0 + iTime / 1400.0) / 10.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        finalColor += col *= d;
    }

    gl_FragColor = vec4(finalColor, 1);
}