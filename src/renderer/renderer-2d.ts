import Rect from '../math/rect.ts';
import Vector2 from '../math/vector2.ts';
import RendererInterface from './renderer-interface.ts';

export default class Renderer2D implements RendererInterface {
    context: CanvasRenderingContext2D;
    defaultColour: "black";

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    drawRect(rect: Rect, colour: string = this.defaultColour): void {
        this.context.fillStyle = colour;
        this.context.fillRect(rect.position.x, rect.position.y, rect.width, rect.height);
    }

    drawLine(from: Vector2, to: Vector2, lineWidth: number = 1, colour: string = this.defaultColour): void {
        this.context.strokeStyle = colour;
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.lineWidth = lineWidth;
        this.context.stroke();
    }

    drawCircle(position: Vector2, radius: number, lineWidth: number = 1, colour: string = this.defaultColour): void {
        this.context.strokeStyle = colour;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    drawText(position: Vector2, text: string, colour: string = this.defaultColour, size: number = 24): void {
        this.context.fillStyle = colour;
        this.context.font = `${ size }px sans-serif`;
        this.context.fillText(text, position.x, position.y);
    }
}
