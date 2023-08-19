import Rect from '../math/rect.ts';
import Vector2 from '../math/vector2.ts';

export default interface RendererInterface {
    clear(): void;

    drawRect(rect: Rect, colour?: string): void;

    drawLine(from: Vector2, to: Vector2, lineWidth?: number, colour?: string): void;

    drawCircle(position: Vector2, radius: number, lineWidth?: number, colour?: string): void;
};
