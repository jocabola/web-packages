import { Mesh, OrthographicCamera, PlaneGeometry, RawShaderMaterial, RGBAFormat, Scene, Vector2 } from 'three';
import frag from '../glsl/fbo.frag';
import vert from '../glsl/fbo.vert';
const TMP = new Vector2();
const MAT = new RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
        tInput: { value: null },
        opacity: { value: 1 }
    }
});
export default class FboHelper {
    constructor() {
        this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.material = MAT;
        var postPlane = new PlaneGeometry(1, 1);
        this.quad = new Mesh(postPlane, this.material);
        this.scene = new Scene();
        this.scene.add(this.quad);
    }
    render(target, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        if (width == 0 || height == 0) {
            width = target.width;
            height = target.height;
        }
        this.drawTexture(target.texture, renderer, x, y, width, height, opacity);
    }
    renderMRT(target, renderer, index, x = 0, y = 0, width = 0, height = 0) {
        if (width == 0 || height == 0) {
            width = target.width;
            height = target.height;
        }
        this.drawTexture(target.texture[index], renderer, x, y, width, height);
    }
    drawTexture(texture, renderer, x = 0, y = 0, width = 0, height = 0, opacity = 1) {
        const s = new Vector2();
        renderer.getSize(s);
        this.camera.left = -s.width / 2;
        this.camera.right = s.width / 2;
        this.camera.top = s.height / 2;
        this.camera.bottom = -s.height / 2;
        this.camera.updateProjectionMatrix();
        this.quad.scale.set(width, height, 1);
        this.quad.position.set(-s.width / 2 + width / 2 + x, s.height / 2 - height / 2 - y, 0);
        this.quad.material = this.material;
        this.material.uniforms.tInput.value = texture;
        this.material.transparent = texture.format == RGBAFormat;
        this.material.uniforms.opacity.value = opacity;
        renderer.render(this.scene, this.camera);
    }
    renderToFbo(target, renderer, material) {
        let s = new Vector2(target.width, target.height);
        this.camera.left = -s.width / 2;
        this.camera.right = s.width / 2;
        this.camera.top = s.height / 2;
        this.camera.bottom = -s.height / 2;
        this.camera.updateProjectionMatrix();
        this.quad.scale.set(s.width, s.height, 1);
        this.quad.position.set(0, 0, 0);
        this.quad.material = material;
        renderer.setRenderTarget(target);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);
    }
    renderToViewport(renderer, material) {
        renderer.getSize(TMP);
        this.camera.left = -TMP.x / 2;
        this.camera.right = TMP.x / 2;
        this.camera.top = TMP.y / 2;
        this.camera.bottom = -TMP.y / 2;
        this.camera.updateProjectionMatrix();
        this.quad.scale.set(TMP.x, TMP.y, 1);
        this.quad.position.set(0, 0, 0);
        this.quad.material = material;
        renderer.setRenderTarget(null);
        renderer.render(this.scene, this.camera);
    }
    dispose() {
        this.quad.geometry.dispose();
    }
}
