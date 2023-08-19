import Rect from '../math/rect.ts';

export default interface RendererInterface {
    clear(): void;

    drawRect(rect: Rect, colour?: string): void;
}
