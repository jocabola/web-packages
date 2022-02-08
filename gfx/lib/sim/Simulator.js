import { AssetsBundle, GLTFAsset, TextureAsset } from '@jocabola/io';
import { ACESFilmicToneMapping, Mesh, MeshPhysicalMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene, ShaderLib, Vector2 } from 'three';
import { ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT.js';
import { BlurPass, FboUtils, SceneUtils } from '../main';
const floor = new Mesh(new PlaneBufferGeometry(1, 1), new MeshPhysicalMaterial({
    color: 0x999999,
    roughness: .3,
    metalness: .1,
    envMapIntensity: .1
}));
const floorShaderRef = {
    value: null
};
const groundMirror = new ReflectorRTT(new PlaneBufferGeometry(1, 1), {
    clipBias: 0.003,
    textureWidth: window.innerWidth,
    textureHeight: window.innerHeight,
    color: 0x333333
});
const RT_SCALE = .25;
const bundle = new AssetsBundle();
bundle.add(new TextureAsset('https://assets.eduprats.com/textures/sim/env/hdri.jpg'));
bundle.add(new TextureAsset('https://assets.eduprats.com/textures/sim/floor/noise2.png'));
export const Figures = {
    boy: new GLTFAsset('https://assets.eduprats.com/models/sim/figures/boy.glb'),
    girl: new GLTFAsset('https://assets.eduprats.com/models/sim/figures/boy.glb'),
    female: new GLTFAsset('https://assets.eduprats.com/models/sim/figures/female.glb'),
    male: new GLTFAsset('https://assets.eduprats.com/models/sim/figures/male.glb'),
    male2: new GLTFAsset('https://assets.eduprats.com/models/sim/figures/male2.glb')
};
export class Simulator {
    constructor(renderer) {
        this.isLoading = false;
        this.scene = new Scene();
        this.setFloorSize(20);
        const _size = new Vector2();
        renderer.getSize(_size);
        this.camera = new PerspectiveCamera(35, _size.width / _size.height, .01, 1000);
        this.scene.add(this.camera);
        this.camera.position.z = 12;
        this.camera.position.y = 8;
        this.rt = FboUtils.getRenderTarget(_size.width * RT_SCALE, _size.height * RT_SCALE, {}, true);
        this.blur = new BlurPass(groundMirror.getRenderTarget().texture, _size.width, _size.height, .25, 1, 4, 2);
        floor.rotateX(-Math.PI / 2);
        groundMirror.rotateX(-Math.PI / 2);
        this.scene.add(floor);
        this.scene.add(groundMirror);
        floor.material.onBeforeCompile = (shader) => {
            const fShader = ShaderLib.physical.fragmentShader;
            let frag = fShader.replace('uniform float opacity;', 'uniform float opacity;uniform sampler2D mirror;uniform vec2 resolution;');
            frag = frag.replace('vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;', `vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
            // add mirror
            vec2 _uv = gl_FragCoord.xy / resolution;
            _uv.x = 1.0 - _uv.x;
            totalDiffuse += (roughnessFactor) * texture2D(mirror, _uv).rgb;`);
            shader.uniforms.mirror = { value: this.blur.texture };
            shader.uniforms.resolution = { value: new Vector2(_size.width, _size.height) };
            shader.fragmentShader = frag;
            floorShaderRef.value = shader;
        };
    }
    load(renderer, onLoaded = null, onProgress = null) {
        if (this.isLoading)
            return console.warn('Simulator is already loading assets!');
        this.isLoading = true;
        bundle.loadAll(() => {
            floor.material.roughnessMap = bundle.assets[1].content;
            floor.material.map = bundle.assets[1].content;
            const env = SceneUtils.setHDRI(bundle.assets[0].content, renderer, {
                toneMapping: ACESFilmicToneMapping,
                exposure: 1
            });
            this.scene.environment = env;
            if (onLoaded != null)
                onLoaded();
        }, onProgress);
    }
    setSize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.rt.setSize(width * RT_SCALE, height * RT_SCALE);
        this.blur.setSize(width, height);
        if (floorShaderRef.value) {
            floorShaderRef.value.uniforms.resolution.value.set(width, height);
        }
    }
    get bundle() {
        return bundle;
    }
    setFloorSize(s) {
        floor.scale.setScalar(s);
        groundMirror.scale.setScalar(s);
    }
    render(renderer) {
        renderer.autoClear = true;
        renderer.setRenderTarget(this.rt);
        floor.visible = false;
        groundMirror.visible = true;
        renderer.render(this.scene, this.camera);
        this.blur.renderInternal(renderer);
        renderer.setRenderTarget(null);
        floor.visible = true;
        groundMirror.visible = false;
        renderer.autoClear = true;
        renderer.render(this.scene, this.camera);
    }
}
