import RenderPass from "./RenderPass";
export default class FXAAPass extends RenderPass {
    constructor(width: number, height: number);
    resize(width: any, height: any): void;
}
