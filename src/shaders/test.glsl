uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

#define t iTime
#define r iResolution.xy

vec4 mainImage(vec2 fragCoord){
        vec3 c;
        float l, z = t / 1000.0;
        for(int i=0; i<3; i++) {
            vec2 uv, p = fragCoord.xy;
            uv = p;
            p -= .5;
            p.x *= r.x / r.y;
            z += .07;
            l = length(p);
            uv += p / l * (sin(z) + 1.) * tanh(sin(l * 9. - z - z));
            c[i] = .01 / length(mod(uv, 1.) - .5);
        }
        return vec4(c / l , t);
}

void main() {
  gl_FragColor = mainImage(vUv);
}