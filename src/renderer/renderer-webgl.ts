import Rect from '../math/rect.ts';
import RendererInterface from './renderer-interface.ts';

export default class RendererWebGl implements RendererInterface {
    gl: WebGL2RenderingContext;
    clearColor: Float32Array;

    constructor(context: WebGL2RenderingContext) {
        this.gl = context;

        this.clearColor = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
    }

    clear(): void {
        this.gl.clearColor(
            this.clearColor[0], 
            this.clearColor[1],
            this.clearColor[2],
            this.clearColor[3],
        );
    }

    drawRect(rect: Rect, colour: string = 'white'): void {
        // Todo
    }
}