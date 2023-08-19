import Rect from '../math/rect.ts';
import Vector2 from '../math/vector2.ts';
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
            this.clearColor[3]
        );
    }

    drawRect(rect: Rect, colour: string = 'black'): void {
        // Todo
    }

    drawLine(from: Vector2, to: Vector2, lineWidth: number = 1, colour: string = 'black'): void {
        // Todo
    }

    drawCircle(position: Vector2, radius: number, lineWidth: number = 1, colour: string = 'black'): void {
        // Todo
    }

    drawText(position: Vector2, text: string, colour: string = 'black', size: number = 24): void {
        // Todo? This doesn't make sense, perhaps move this into a dedicated UI layer instead?
    }
};
