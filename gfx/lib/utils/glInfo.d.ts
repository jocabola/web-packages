export default class glInfo {
    gl: WebGL2RenderingContext | WebGLRenderingContext;
    dds: boolean;
    maxTextureSize: number;
    maxCubeTextureSize: number;
    maxTextureUnits: number;
    maxViewportSize: number;
    pointSizeMin: number;
    pointSizeMax: number;
    maxVertexImageUnits: number;
    renderer: string;
    vendor: string;
    halfFloatRenderTarget: boolean;
    fullFloatRenderTarget: boolean;
    private constructor();
    checkRenderTargetSupport(format: number, type: number): boolean;
    crapGPU(): boolean;
    isModernAppleGPU(): boolean;
}
