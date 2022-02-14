"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = exports.Figures = void 0;
const io_1 = require("@jocabola/io");
const three_1 = require("three");
const ReflectorRTT_js_1 = require("three/examples/jsm/objects/ReflectorRTT.js");
const main_1 = require("../main");
const floor = new three_1.Mesh(new three_1.PlaneBufferGeometry(1, 1), new three_1.MeshPhysicalMaterial({
    color: 0x999999,
    roughness: .3,
    metalness: .1,
    envMapIntensity: .1
}));
const floorShaderRef = {
    value: null
};
const groundMirror = new ReflectorRTT_js_1.ReflectorRTT(new three_1.PlaneBufferGeometry(1, 1), {
    clipBias: 0.003,
    textureWidth: window.innerWidth,
    textureHeight: window.innerHeight,
    color: 0x333333
});
const RT_SCALE = .25;
const bundle = new io_1.AssetsBundle();
bundle.add(new io_1.TextureAsset('https://assets.eduprats.com/textures/sim/env/hdri.jpg'));
bundle.add(new io_1.TextureAsset('https://assets.eduprats.com/textures/sim/floor/noise2.png'));
exports.Figures = {
    boy: new io_1.GLTFAsset('https://assets.eduprats.com/models/sim/figures/boy.glb'),
    girl: new io_1.GLTFAsset('https://assets.eduprats.com/models/sim/figures/girl.glb'),
    female: new io_1.GLTFAsset('https://assets.eduprats.com/models/sim/figures/female.glb'),
    male: new io_1.GLTFAsset('https://assets.eduprats.com/models/sim/figures/male.glb'),
    male2: new io_1.GLTFAsset('https://assets.eduprats.com/models/sim/figures/male2.glb')
};
class Simulator {
    constructor(renderer) {
        this.isLoading = false;
        this.scene = new three_1.Scene();
        this.setFloorSize(20);
        const _size = new three_1.Vector2();
        renderer.getSize(_size);
        this.camera = new three_1.PerspectiveCamera(35, _size.width / _size.height, .01, 1000);
        this.scene.add(this.camera);
        this.camera.position.z = 12;
        this.camera.position.y = 8;
        this.rt = main_1.FboUtils.getRenderTarget(_size.width * RT_SCALE, _size.height * RT_SCALE, {}, true);
        this.blur = new main_1.BlurPass(groundMirror.getRenderTarget().texture, _size.width, _size.height, .25, 1, 4, 2);
        floor.rotateX(-Math.PI / 2);
        groundMirror.rotateX(-Math.PI / 2);
        this.scene.add(floor);
        this.scene.add(groundMirror);
        floor.material.onBeforeCompile = (shader) => {
            const fShader = three_1.ShaderLib.physical.fragmentShader;
            let frag = fShader.replace('uniform float opacity;', 'uniform float opacity;uniform sampler2D mirror;uniform vec2 resolution;');
            frag = frag.replace('vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;', `vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
            // add mirror
            vec2 _uv = gl_FragCoord.xy / resolution;
            _uv.x = 1.0 - _uv.x;
            totalDiffuse += (roughnessFactor) * texture2D(mirror, _uv).rgb;`);
            shader.uniforms.mirror = { value: this.blur.texture };
            shader.uniforms.resolution = { value: new three_1.Vector2(_size.width, _size.height) };
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
            const env = main_1.SceneUtils.setHDRI(bundle.assets[0].content, renderer, {
                toneMapping: three_1.ACESFilmicToneMapping,
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
exports.Simulator = Simulator;
